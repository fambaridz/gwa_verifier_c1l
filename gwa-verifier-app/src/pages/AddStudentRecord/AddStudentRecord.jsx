import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import { DropzoneArea } from "mui-file-dropzone";
import StudentRecordForm from "Components/StudentRecordForm";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import "./AddStudentRecord.css";

import { extractFromFile } from "../../utils/extracters.js";
import { fromMapToArray } from "../../utils/transformers.js";
import * as validators from "../../utils/validators.js";
import GradeRecordTable from "Components/GradeRecordTable";
import CarouselButtons from "Components/CarouselButtons";
import AddStudentFormFooter from "Components/AddStudentFormFooter";
import StudentFormFooter from "Components/StudentFormFooter";
import EditTermDialog from "Components/EditTermDialog";
import DeleteTermDialog from "Components/DeleteTermDialog";
import ForceSaveDialog from "Components/ForceSaveDialog";
import ParsingModal from "Components/ParsingModal";
import { useDialog } from "../../hooks";
import { BACKEND_URI } from "../../constants.js";
import Cookies from "universal-cookie";

// const BACKEND_URI = "http://localhost/gwa-verifier-backend";

const acceptedFiles = ["text/csv"];

function AddStudentRecord() {
  const navigate = useNavigate();

  // for notifications
  const { enqueueSnackbar } = useSnackbar();
  const { open: dialogOpen, toggle: toggleDialog } = useDialog();
  const { open: deleteDialogStatus, toggle: toggleDeleteDialog } = useDialog();
  const [studentRecords, setStudentRecords] = useState({});
  const [gradeRecords, setGradeRecords] = useState({});
  const [page, setPage] = useState(0);

  const [saving, setSaving] = useState(false);

  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [srUidTermMap, setSrUidTermMap] = useState({});
  const [parsing, setParsing] = useState(false);
  const [comments, setComment] = useState([]);

  /**
   * {
   *    [uid]: messages[]
   * }
   */
  const [studentInfoErrors, setStudentInfoErrors] = useState({});
  const [studentRecordErrors, setStudentRecordErrors] = useState({});

  /*
  the index represents the page number
  0, 1, 2, ..., pageNum = length - 1 
  [ uid1, uid2, uid3]
   */
  // sruid stands for "Student Record UID"
  const [srUidPageMap, setSrUidPageMap] = useState([]);

  const [showForceSave, setShowForceSave] = useState(false);

  //  get user's email from cookies
  const cookie = new Cookies();
  const email = cookie.get("email")

  async function handleChange(files) {
    if (!files.length) return;
    // get the content of all files
    setParsing(true);
    try {
      const [_studentRecords, _srUidPageMap, _gradeRecords, _srUidTermMap] =
        await extractFromFile(files);

      const firstRecord = _srUidPageMap[0];
      const terms = _srUidTermMap[firstRecord];
      const firstTerm = terms[0];

      setStudentRecords(_studentRecords);
      setSrUidPageMap(_srUidPageMap);
      setGradeRecords(_gradeRecords);
      setTerms(terms);
      setTerm(firstTerm);
      setSrUidTermMap(_srUidTermMap);
    } catch (error) {
      console.log(error);
    }
    setParsing(false);
  }

  function handleStudentRecordsChange({ name, value }) {
    const uuid = srUidPageMap[page];
    const copy = {
      ...studentRecords[uuid],
      [name]: value,
    };

    setStudentRecords({ ...studentRecords, [uuid]: { ...copy } });
  }

  function handleCommentChange(e, index){
    e.preventDefault();
    const updateComment = [...comments];
    updateComment[index] = e.target.value;
    setComment(updateComment); 
  }

  function getField(name) {
    const uid = srUidPageMap[page];
    if (!uid) return "";

    const studentRecord = studentRecords[uid];
    if (!studentRecord) return "";

    const res = studentRecord[name];
    if (!res) return "";
    return res;
  }
  function nextPage() {
    if (page === studentRecords.length - 1) return;
    const newPage = page + 1;
    updateTerms(newPage);
    setPage(newPage);
  }
  function prevPage() {
    if (page === 0) return;
    const newPage = page - 1;
    updateTerms(newPage);
    setPage(newPage);
  }
  /**
   *
   * @param {number} nextPage
   */
  function updateTerms(nextPage) {
    const srUid = srUidPageMap[nextPage];
    const _terms = srUidTermMap[srUid];
    const [firstTerm] = _terms;

    setTerms(_terms);
    setTerm(firstTerm);
  }

  function redirectToStudentRecords() {
    navigate("/records");
  }

  function popStack() {
    // TODO: extract this logic to a separate function and just import it
    const uid = srUidPageMap[page];
    const copyOfStudentRecords = { ...studentRecords };
    const copyOfUidPageMap = [...srUidPageMap];
    delete copyOfStudentRecords[uid];
    copyOfUidPageMap.splice(page, 1);

    const newLength = Object.keys(studentRecords).length - 1;
    const newPage = page === 0 ? page : page - 1;

    setStudentRecords(copyOfStudentRecords);
    setPage(newPage);
    setSrUidPageMap(copyOfUidPageMap);
    if (newLength === 0) {
      redirectToStudentRecords();
      return;
    }
    updateTerms(newPage);
    // move the comments from the page
    const updateComment = [...comments];
    updateComment[page] = updateComment[page+1];
    setComment(updateComment); 
  }
  function handleGradeRecordChange({ uid, columnId, value }) {
    const record = gradeRecords[uid];

    if (!record) return;
    Object.assign(record, {
      [columnId]: value,
    });
    setGradeRecords({ ...gradeRecords, [uid]: record });
  }
  function presentData() {
    // const records = gradeRecords.filter(record => record.term === term);

    // get studentUid
    const srUid = srUidPageMap[page];

    const records = fromMapToArray(gradeRecords, "uid").filter(
      (record) => record.term === term && record.srUid === srUid
    );
    return records;
  }

  function verifyStudentRecords({ studno, gradeRecordsReady, recommended }) {
    return new Promise(async (resolve, reject) => {
      try {
        const payload2 = {
          studno: Number.parseInt(studno),
          student_record: gradeRecordsReady.map((record) => ({
            ...record,
            course_number: record.courseno,
            running_total: record.total,
          })),
        };

        console.log(JSON.stringify(payload2));

        const _res = await fetch(
          `${BACKEND_URI}/add-edit-record-api/verify-student-record.php`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload2),
          }
        );

        const data = await _res.json();
        if (!data) throw new Error("Cannot parse json data");

        const { error, records_remarks } = data;

        if (!error) {
          enqueueSnackbar("Student records are valid. You can now save it", {
            variant: "success",
          });
          resolve();
          return;
        }

        // compose error message
        const [studentInfoErrors, studentRecordErrors] = getErrorMessages({
          ...data,
          recommended: parseInt(recommended),
        });

        reject([studentInfoErrors, studentRecordErrors]);

        console.table(records_remarks);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  function locallyVerifyStudent({ studno, recommended }) {
    if (
      !validators.studentNoRegex.test(studno) ||
      !validators.recommendedUnitsRegex.test(recommended)
    ) {
      return false;
    }
    return true;
  }

  function locallyVerifyGradeRecords({ uid }) {
    return new Promise((resolve, reject) => {
      const gradeRecordsReady = Object.keys(gradeRecords)
        .filter((grUid) => gradeRecords[grUid].srUid === uid)
        .map((grUid) => {
          let record = { ...gradeRecords[grUid] };
          const { grade, units, term, running_total } = record;

          if (
            !validators.gradeRegex.test(grade) ||
            !validators.termRegex.test(term) ||
            !validators.unitsRegex.test(units) ||
            !validators.defaultRegex.test(running_total)
          ) {
            reject();
          }
          Object.assign(record, {
            total: record.running_total,
          });
          delete record["running_total"];
          return record;
        });
      resolve(gradeRecordsReady);
    });
  }

  async function saveOne() {
    // save the data w/ respect to the current page

    console.log("SAVING?");
    const uid = srUidPageMap[page];

    const studentRecord = studentRecords[uid];
    let { studNo: studno, recommended } = studentRecord;
    // input validation for student info

    if (
      !validators.studentNoRegex.test(studno) ||
      !validators.recommendedUnitsRegex.test(recommended)
    ) {
      enqueueSnackbar("Cannot save all students, some still have errors", {
        variant: "error",
      });
      return;
    }

    studno = studno.split("-").join("");

    let gradeRecordsReady = [];

    // verify student records / grade records locally
    try {
      gradeRecordsReady = await locallyVerifyGradeRecords({ uid });
    } catch (error) {
      console.warn(error);
      setSaving(false);
      enqueueSnackbar(
        "Cannot save all student records, some still have errors",
        {
          variant: "error",
        }
      );
      return;
    }

    // addComment POST request
    if(comments[page] && comments[page].trim()!==""){
      try{
  
        const payload = {
          email,
          studno,
          comment: comments[page].trim()
        };
        console.log(payload);
        const res = await fetch(`${BACKEND_URI}/add-edit-record-api/addComment.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (!res.ok) {
          const error = res.status;
          throw new Error(error);
        }
  
      }catch(error){}
    }

    // verify if student records are valid by sending a request to the backend
    try {
      await verifyStudentRecords({
        studno,
        uid,
        gradeRecordsReady,
        recommended,
      });
    } catch (error) {
      console.warn(error);
      if (error && error.length) {
        const [studentInfoErrors, studentRecordErrors] = error;
        setStudentInfoErrors({ [uid]: studentInfoErrors });
        setStudentRecordErrors({ [uid]: studentRecordErrors });
        enqueueSnackbar("Errors in student records. Please see message", {
          variant: "error",
        });
      }
      setSaving(false);
      return;
    }

    try {
      // creating student record info is working
      const payload = {
        ...studentRecord,
        email: email,
        studno,
        status: "UNCHECKED",
      };
      console.table(payload);
      let res = await fetch(
        `${BACKEND_URI}/add-edit-record-api/add-student.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        console.table(res);
        const data = await res.json();
        const { msg } = data;
        throw new Error(msg);
      }

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      return;
    }

    // save grade records
    try {
      const payload = {
        studno,
        email: email,
        lst: gradeRecordsReady,
      };

      console.log(JSON.stringify(payload));

      const res = await fetch(
        `${BACKEND_URI}/add-edit-record-api/addStudentRecord.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = res.status;
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });
    setSaving(false);
  }

  async function forceSave() {
    // save the data w/ respect to the current page

    const uid = srUidPageMap[page];

    const studentRecord = studentRecords[uid];
    let { studNo: studno, recommended } = studentRecord;
    // input validation for student info

    if (!locallyVerifyStudent({ studno, recommended })) {
      enqueueSnackbar("Cannot save all students, some still have errors", {
        variant: "error",
      });
      return;
    }

    studno = studno.split("-").join("");

    let gradeRecordsReady = [];

    // verify student records / grade records locally
    try {
      gradeRecordsReady = await locallyVerifyGradeRecords({ uid });
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(
        "Cannot save all student records, some still have errors",
        {
          variant: "error",
        }
      );
      return;
    }
    setSaving(true);

    try {
      // creating student record info is working
      const payload = {
        ...studentRecord,
        studno,
        email: email,
        status: "INCOMPLETE",
        rec_units: 0,
        cred_units: 0,
        gwa: 0,
      };
      console.table(payload);
      let res = await fetch(
        `${BACKEND_URI}/add-edit-record-api/add-student.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        console.table(res);
        const data = await res.json();
        const { msg } = data;
        const error = res.status;
        throw new Error(msg);
      }

      // ready the data
    } catch (error) {
      console.warn(error);
      enqueueSnackbar(`Error in saving record: ${error}`, {
        variant: "error",
      });
      setSaving(false);
      return;
    }

    

    // save grade records
    try {
      const payload = {
        studno,
        email: email,
        lst: gradeRecordsReady,
      };

      console.log(JSON.stringify(payload));

      const res = await fetch(
        `${BACKEND_URI}/add-edit-record-api/addStudentRecord.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = res.status;
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
      setSaving(false);
    }

    // save comments (if any)
    if(comments[page] && comments[page].trim()!==""){
      try{
        const payload = {
          email,
          studno,
          comment: comments[page].trim()
        };
        console.log(payload);
        const res = await fetch(`${BACKEND_URI}/add-edit-record-api/addComment.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (!res.ok) {
          const error = res.status;
          throw new Error(error);
        }
      }catch(error){}
    }


    enqueueSnackbar(`Student successfully saved.`, {
      variant: "success",
    });
    setSaving(false);
    setShowForceSave(false);
  }

  function addRow() {
    const currSrUid = srUidPageMap[page];
    const newRecord = {
      term,
      courseno: "",
      grade: "",
      units: "",
      enrolled: "",
      running_total: "",
      srUid: currSrUid,
    };
    const grUid = uuidv4();
    setGradeRecords({
      ...gradeRecords,
      [grUid]: newRecord,
    });
  }

  function deleteRow(uid) {
    const gradeRecordCopy = { ...gradeRecords };
    if (!gradeRecordCopy[uid]) return;
    delete gradeRecordCopy[uid];
    setGradeRecords(gradeRecordCopy);
  }
  // TODO: refactor this; extract logic to separate function
  function updateTerm(prevValue, currValue) {
    const newTerms = terms.map((term) =>
      term === prevValue ? currValue : term
    );
    const srUid = srUidPageMap[page];
    const srUidTermMapCopy = { ...srUidTermMap };
    Object.assign(srUidTermMapCopy, {
      [srUid]: newTerms,
    });

    console.table(srUidTermMapCopy);

    const gradeRecordsCopy = {};
    Object.keys(gradeRecords).forEach((grUid) => {
      const record = { ...gradeRecords[grUid] };
      let { term, srUid: recordSrUid } = record;
      if (recordSrUid === srUid && term === prevValue) term = currValue;
      Object.assign(record, { term });
      Object.assign(gradeRecordsCopy, {
        [grUid]: record,
      });
    });

    // since the only editable term is the selected term, we will update the current term accordingly
    setTerm(currValue);
    setTerms(newTerms);
    setSrUidTermMap(srUidTermMapCopy);
    setGradeRecords(gradeRecordsCopy);
    toggleDialog();
  }
  // TODO: refactor this; extract logic to separate function
  function deleteTerm(srUid, term) {
    let termsCopy = srUidTermMap[srUid];
    if (!termsCopy) return;
    // filter the terms
    termsCopy = termsCopy.filter((t) => t !== term);

    // filter grade records with the term and the srUid
    const gradeRecordsCopy = {};
    Object.keys(gradeRecords).forEach((grUid) => {
      const record = gradeRecords[grUid];
      // const { srUid: recordSrUid, term: t } = record;
      if (record.srUid === srUid && record.term === term) return;
      Object.assign(gradeRecordsCopy, {
        [grUid]: record,
      });
    });

    // update
    const srUidTermMapCopy = { ...srUidTermMap };
    Object.assign(srUidTermMapCopy, {
      [srUid]: termsCopy,
    });
    const [newTerm = ""] = termsCopy;
    setTerm(newTerm);
    setTerms(termsCopy);
    setSrUidTermMap(srUidTermMapCopy);
    setGradeRecords(gradeRecordsCopy);
    toggleDeleteDialog();
  }

  function renderErrors({ title, messages }) {
    const uid = srUidPageMap[page];
    const keys = Object.keys(messages);
    const listItems =
      keys.length !== 0 && keys.includes(uid)
        ? messages[uid].map((message, idx) => <li key={idx}>{message}</li>)
        : null;
    return listItems && listItems.length > 0 ? (
      <Alert severity="error">
        <AlertTitle>{title}</AlertTitle>
        <ul>{listItems}</ul>
      </Alert>
    ) : null;
  }

  function renderStudentRecordForms() {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginBottom: 4,
          }}
        >
          <CarouselButtons
            currPage={page}
            maxPage={Object.keys(studentRecords).length}
            saving={saving}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </Box>
        {renderErrors({
          title: "Error in student information",
          messages: studentInfoErrors,
        })}
        <StudentRecordForm
          firstName={getField("fname")}
          middleName={getField("mname")}
          lastName={getField("lname")}
          suffix={getField("suffix")}
          studNo={getField("studNo")}
          degree={getField("degree")}
          recommended={getField("recommended")}
          term={term}
          setTerm={setTerm}
          terms={terms}
          loading={saving}
          handleAddRow={addRow}
          handleInputChange={handleStudentRecordsChange}
          // handleInputChange={(e) => {
          //   const uuid = srUidPageMap[page];
          //   handleStudentRecordsChange(e, uuid);
          // }}
          handleEditTerm={toggleDialog}
          handleDeleteTerm={toggleDeleteDialog}
          handleComment = {handleCommentChange}
          comment={comments[page]||""}
          index={page}
          table={
            <>
              {renderErrors({
                title: "Error in grades",
                messages: studentRecordErrors,
              })}
              <GradeRecordTable
                data={presentData()}
                handleUpdate={handleGradeRecordChange}
                handleDelete={deleteRow}
              />
            </>
          }
          footer={
            // <AddStudentFormFooter
            //   popStack={popStack}
            //   saveOne={saveOne}
            //   saving={saving}
            //   saveAll={saveAll}
            // />
            <StudentFormFooter
              popStack={popStack}
              onSave={() => saveOne()}
              loading={saving}
              cb={() => setShowForceSave(true)}
            />
          }
        />
      </>
    );
  }

  return (
    <>
      <ParsingModal open={parsing} />
      <Box sx={{ mt: 2.5, ml: 3, fontSize: 14 }}>
        <Link to="/records" className="back-link">
          &lt; Back to Student Records
        </Link>
      </Box>
      <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {Object.keys(studentRecords).length === 0 ? (
          <DropzoneArea
            filesLimit={10}
            acceptedFiles={acceptedFiles}
            onChange={handleChange}
            showAlerts={false}
          />
        ) : (
          renderStudentRecordForms()
        )}
      </Container>
      <EditTermDialog
        initialValue={term}
        open={dialogOpen}
        handleCancel={toggleDialog}
        handleSave={updateTerm}
      />
      <DeleteTermDialog
        open={deleteDialogStatus}
        term={term}
        srUid={srUidPageMap[page] || ""}
        name={`${getField("lname")} ${getField("fname")}`}
        handleCancel={toggleDeleteDialog}
        handleDelete={deleteTerm}
      />
      <ForceSaveDialog
        open={showForceSave}
        handleCancel={() => setShowForceSave(false)}
        onSuccess={forceSave}
      />
    </>
  );
}

export default AddStudentRecord;

function getErrorMessages(data) {
  const {
    hk11_required,
    hk11_taken,
    hk1213_required,
    hk1213_taken,
    nstp1_required,
    nstp1_taken,
    nstp2_required,
    nstp2_taken,
    recommended_required,
    recommended,
    major_units_required,
    major_units_taken,
    ge_units_required,
    ge_units_taken,
    elective_units_required,
    elective_units_taken,
  } = data;

  const studentRecordErrors = [];
  const studentInfoErrors = [];

  if (hk11_required !== hk11_taken)
    studentRecordErrors.push(
      `HK11 is not enough. Currently taken is ${hk11_taken} but required is ${hk11_required}`
    );
  if (hk1213_required !== hk1213_taken)
    studentRecordErrors.push(
      `HK12 and HK13 is not enough. Currently taken is ${hk1213_taken} but required is ${hk1213_required}`
    );

  if (nstp1_required !== nstp1_taken)
    studentRecordErrors.push(
      `NSTP 1 is not enough. Currently taken is ${nstp1_taken} but required is ${nstp1_required}`
    );
  if (nstp2_required !== nstp2_taken)
    studentRecordErrors.push(
      `NSTP 2 is not enough. Currently taken is ${nstp2_taken} but required is ${nstp2_required}`
    );

  if (recommended < recommended_required)
    studentInfoErrors.push(
      `Provided recommended units (${recommended}) is less than actual recommended units: ${recommended_required}`
    );
  if (major_units_taken < major_units_required)
    studentRecordErrors.push(
      `Major units taken (${major_units_taken}) is less than major units required: ${major_units_required}`
    );
  if (ge_units_taken < ge_units_required)
    studentRecordErrors.push(
      `GE units taken (${ge_units_taken}) is less than GE units required: (${ge_units_required})`
    );
  if (elective_units_taken < elective_units_required)
    studentRecordErrors.push(
      `Elective units taken  (${elective_units_taken}) is less than elective units required (${elective_units_required})`
    );

  return [studentInfoErrors, studentRecordErrors];
}
