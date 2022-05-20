import React, { useState, useEffect, useCallback } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import GradeRecordTable from "Components/GradeRecordTable";
import StudentRecordForm from "Components/StudentRecordForm/";
import { BACKEND_URI } from "../../constants.js";
import { fromMapToArray } from "../../utils/transformers.js";

// edit this to create the edit student record page
function EditStudentRecord() {
  const params = useParams();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [studentRecord, setStudentRecord] = useState(null);

  const [gradeRecords, setGradeRecords] = useState(null);
  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [comment, setComment] = useState("");

  async function handleSave() {
    setSaving(true);

    let res = await fetch(BACKEND_URI, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentRecord),
    });

    const promises = Object.keys(gradeRecords).map((key) => {
      const record = gradeRecords[key];
      return fetch(BACKEND_URI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
    });

    res = await Promise.all(promises);
    console.log(res);
    setTimeout(() => setSaving(false), 3000);
  }

  function redirectToStudentRecords() {
    navigate("/records");
    console.log("navigate");
  }

  const { id: studno } = params;
  async function getStudentInfo() {
    try {
      const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          action: "get-student",
          student_number: studno,
        }),
      });
      const body = await res.text();
      const student = JSON.parse(body)[0];
      let {
        student_number: studNo,
        firstname: fname,
        lastname: lname,
        middlename: mname,
        degree_program: degree,
        recommended_number_units: recommended,
        suffix,
      } = student;
      studNo = `${studNo.slice(0, 4)}-${studNo.slice(4)}`;
      delete student.student_number;
      setStudentRecord({
        fname,
        lname,
        mname,
        degree,
        recommended,
        suffix,
        studNo,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  async function getCourses() {
    try {
      const payload = {
        action: "get-courses",
        student_number: studno,
      };
      const res = await fetch(`${BACKEND_URI}/record-details-api/details.php`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.table(data);
      const newRecords = {};
      const _terms = [];
      data.forEach((record) => {
        const { id, course_number: courseno, term, ...rest } = record;
        if (!_terms.includes(term)) _terms.push(term);
        Object.assign(newRecords, {
          [id]: {
            courseno,
            term,
            ...rest,
          },
        });
      });
      setTerms(_terms);
      setTerm(_terms[0]);
      setGradeRecords(newRecords);
    } catch (error) {
      console.warn(error);
    }
  }

  function getField(name) {
    if (!studentRecord) return;
    const res = studentRecord[name];
    if (!res) return "";
    return res;
  }

  function presentData() {
    if (gradeRecords === null) return [];
    const records = fromMapToArray(gradeRecords, "uid").filter(
      (record) => record.term === term
    );
    return records;
  }
  function handleGradeRecordChange({ uid, columnId, value }) {
    const record = gradeRecords[uid];
    if (!record) return;
    Object.assign(record, {
      [columnId]: value,
    });
    setGradeRecords({ ...gradeRecords, [uid]: record });
  }

  function handleStudentRecordsChange({ name, value }) {
    const copy = {
      ...studentRecord,
      [name]: value,
    };

    setStudentRecord(copy);
  }
  function updateComment(newValue) {
    setComment(newValue);
  }
  useEffect(() => {
    getStudentInfo();
    getCourses();
  }, []);
  return studentRecord === null && gradeRecords === null ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginBottom: 4,
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Container sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* <Typography variant="h1">
          Edit student record page w/ the ff. url parameter: {id}
        </Typography> */}
      <StudentRecordForm
        handleCancel={redirectToStudentRecords}
        loading={saving}
        handleSave={handleSave}
        firstName={getField("fname")}
        middleName={getField("mname")}
        lastName={getField("lname")}
        suffix={getField("suffix")}
        studentNo={getField("studNo")}
        degree={getField("degree")}
        recommended={getField("recommended")}
        handleInputChange={handleStudentRecordsChange}
        term={term}
        setTerm={setTerm}
        terms={terms}
        extraFeaturesEnabled={false}
        updateComment={updateComment}
        table={
          <GradeRecordTable
            data={presentData()}
            handleUpdate={handleGradeRecordChange}
            enabledExtraFeature={false}
          />
        }
      />
    </Container>
  );
}

export default EditStudentRecord;
