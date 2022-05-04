-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2022 at 11:52 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gwa_verifier_c1l_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `committee`
--

CREATE TABLE `committee` (
  `email` varchar(50) NOT NULL,
  `account_made_by` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `suffix` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `committee_student`
--

CREATE TABLE `committee_student` (
  `committee_email` varchar(50) NOT NULL,
  `student_number` int(20) NOT NULL,
  `comments` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `degree_curriculums`
--

CREATE TABLE `degree_curriculums` (
  `degree_id` int(50) NOT NULL,
  `degree_name` varchar(50) NOT NULL,
  `degree_nickname` varchar(30) NOT NULL,
  `old_new` varchar(20) NOT NULL,
  `major` varchar(30) NOT NULL,
  `recommended_units` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `degree_curriculums`
--

INSERT INTO `degree_curriculums` (`degree_id`, `degree_name`, `degree_nickname`, `old_new`, `major`, `recommended_units`) VALUES
(1, 'BA Communication Arts', 'BACA', 'New', '', 145),
(2, 'BA Communication Arts', 'BACA', 'New', 'Speech Communication', 145),
(3, 'BA Communication Arts', 'BACA', 'New', 'Writing', 145),
(4, 'BA Communication Arts', 'BACA', 'New', 'Theater Arts', 145),
(5, 'BA Philosophy', 'BAPHLO', 'New', '', 132),
(6, 'BA Sociology', 'BASOCIO', 'New', '', 136),
(7, 'BS Applied Mathematics', 'BSAMAT', 'New', '', 131),
(8, 'BS Applied Physics', 'BSAPHY', 'New', '', 143),
(9, 'BS Biology', 'BSBIO', 'New', '', 143),
(10, 'BS Biology', 'BSBIO', 'New', 'Cell and Molecular Biology', 143),
(11, 'BS Biology', 'BSBIO', 'New', 'Ecology', 143),
(12, 'BS Biology', 'BSBIO', 'New', 'Genetics', 143),
(13, 'BS Biology', 'BSBIO', 'New', 'Microbiology', 143),
(14, 'BS Biology', 'BSBIO', 'New', 'Plant Biology', 143),
(15, 'BS Biology', 'BSBIO', 'New', 'Systematics', 143),
(16, 'BS Biology', 'BSBIO', 'New', 'Wildlife Biology', 143),
(17, 'BS Biology', 'BSBIO', 'New', 'Zoology', 143),
(18, 'BS Chemistry', 'BSCHEM', 'New', '', 142),
(19, 'BS Computer Science', 'BSCS', 'New', '', 130),
(20, 'BS Mathematics', 'BSMATH', 'New', '', 131),
(21, 'BS Mathematics & Science Teaching', 'BSMST', 'New', '', 0),
(22, 'BS Mathematics & Science Teaching', 'BSMST', 'New', 'Biology', 141),
(23, 'BS Mathematics & Science Teaching', 'BSMST', 'New', 'Chemistry', 140),
(24, 'BS Mathematics & Science Teaching', 'BSMST', 'New', 'Mathematics', 142),
(25, 'BS Mathematics & Science Teaching', 'BSMST', 'New', 'Physics', 140),
(26, 'BS Statistics', 'BSSTAT', 'New', '', 143),
(27, 'BS Agricultural Chemistry', 'BSAGCHEM', 'New', '', 190),
(28, 'BA Communication Arts', 'BACA', 'Old', '', 141),
(29, 'BA Communication Arts', 'BACA', 'Old', 'Speech Communication', 141),
(30, 'BA Communication Arts', 'BACA', 'Old', 'Writing', 141),
(31, 'BA Communication Arts', 'BACA', 'Old', 'Theater Arts', 141),
(32, 'BA Philosophy', 'BAPHLO', 'Old', '', 0),
(33, 'BA Sociology', 'BASOCIO', 'Old', '', 0),
(34, 'BS Applied Mathematics', 'BSAMAT', 'Old', '', 145),
(35, 'BS Applied Physics', 'BSAPHY', 'Old', '', 0),
(36, 'BS Biology', 'BSBIO', 'Old', '', 153),
(37, 'BS Biology', 'BSBIO', 'Old', 'Cell and Molecular Biology', 153),
(38, 'BS Biology', 'BSBIO', 'Old', 'Ecology', 153),
(39, 'BS Biology', 'BSBIO', 'Old', 'Genetics', 153),
(40, 'BS Biology', 'BSBIO', 'Old', 'Microbiology', 153),
(41, 'BS Biology', 'BSBIO', 'Old', 'Plant Biology', 153),
(42, 'BS Biology', 'BSBIO', 'Old', 'Systematics', 153),
(43, 'BS Biology', 'BSBIO', 'Old', 'Wildlife Biology and Zoology', 153),
(44, 'BS Chemistry', 'BSCHEM', 'Old', '', 160),
(45, 'BS Computer Science', 'BSCS', 'Old', '', 141),
(46, 'BS Mathematics', 'BSMATH', 'Old', '', 139),
(47, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', '', 0),
(48, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Mathematics', 144),
(49, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Biology', 146),
(50, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Chemistry', 145),
(51, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Physics', 141),
(52, 'BS Statistics', 'BSSTAT', 'Old', '', 149),
(53, 'BS Agricultural Chemistry', 'BSAGCHEM', 'Old', '', 194);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_number` int(20) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `degree_program` varchar(50) NOT NULL,
  `recommended_number_units` int(20) NOT NULL,
  `credited_units` int(20) NOT NULL,
  `gwa` float NOT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_number`, `lastname`, `firstname`, `middlename`, `suffix`, `degree_program`, `recommended_number_units`, `credited_units`, `gwa`, `status`) VALUES
(201901234, 'MAKILING', 'MARIA', NULL, NULL, 'BACA', 144, 146, 1.74486, 'UNVERIFIED');

-- --------------------------------------------------------

--
-- Table structure for table `student_record`
--

CREATE TABLE `student_record` (
  `id` int(50) NOT NULL,
  `student_number` int(20) NOT NULL,
  `course_number` varchar(20) NOT NULL,
  `grade` varchar(30) NOT NULL,
  `units` varchar(50) NOT NULL,
  `enrolled` float NOT NULL,
  `running_total` double NOT NULL,
  `term` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_record`
--

INSERT INTO `student_record` (`id`, `student_number`, `course_number`, `grade`, `units`, `enrolled`, `running_total`, `term`) VALUES
(1, 201501234, 'ENG 1(AH)', '2', '3', 6, 6, 'I/15/16'),
(2, 201501234, 'FIL 20', '2.25', '3', 6.75, 12.75, 'I/15/16'),
(3, 201501234, 'IT 1(MST)', '2', '3', 6, 18.75, 'I/15/16'),
(4, 201501234, 'PE 1', '2', '0', 0, 18.75, 'I/15/16'),
(5, 201501234, 'PHLO1(SSP)', '1.75', '3', 5.25, 24, 'I/15/16'),
(6, 201501234, 'PSY 1(SSP)', '1.75', '3', 5.25, 29.25, 'I/15/16'),
(7, 201501234, 'SPCM 1(AH)', '1.75', '3', 5.25, 34.5, 'I/15/16'),
(8, 201501234, 'ENG 2(AH)', '1.5', '3', 4.5, 39, 'II/15/16'),
(9, 201501234, 'HUM 1(AH)', '1.5', '3', 4.5, 43.5, 'II/15/16'),
(10, 201501234, 'HUM 2(AH)', '1.5', '3', 4.5, 48, 'II/15/16'),
(11, 201501234, 'MATH1(MST)', '2', '3', 6, 54, 'II/15/16'),
(12, 201501234, 'MATH2(MST)', '2', '3', 6, 60, 'II/15/16'),
(13, 201501234, 'SOSC1(SSP)', '2.5', '3', 7.5, 67.5, 'II/15/16'),
(14, 201501234, 'COMA 101', '1.25', '3', 3.75, 71.25, 'I/16/17'),
(15, 201501234, 'ENG 4', '2', '3', 6, 77.25, 'I/16/17'),
(16, 201501234, 'JAP 10', '1.75', '3', 5.25, 82.5, 'I/16/17'),
(17, 201501234, 'MATH 17', '1.75', '5', 8.75, 91.25, 'I/16/17'),
(18, 201501234, 'NASC3(MST)', '2', '3', 6, 97.25, 'I/16/17'),
(19, 201501234, 'NSTP 1', '1.75', '0', 0, 97.25, 'I/16/17'),
(20, 201501234, 'SPCM 102', '1.75', '3', 5.25, 102.5, 'I/16/17'),
(21, 201501234, 'COMA 104', '1.25', '3', 3.75, 106.25, 'II/16/17'),
(22, 201501234, 'FIL 21', '2', '3', 6, 112.25, 'II/16/17'),
(23, 201501234, 'JAP 11', '1.75', '3', 5.25, 117.5, 'II/16/17'),
(24, 201501234, 'MGT 101', '1.5', '3', 4.5, 122, 'II/16/17'),
(25, 201501234, 'SOC 130', '2.25', '3', 6.75, 128.75, 'II/16/17'),
(26, 201501234, 'STAT 1', '1.75', '3', 5.25, 134, 'II/16/17'),
(27, 201501234, 'ENG 101', '2', '3', 6, 140, 'I/17/18'),
(28, 201501234, 'COMA 192', '1', '3', 3, 143, 'I/17/18'),
(30, 201501234, 'HUM 150', '1.75', '3', 5.25, 154.25, 'I/17/18'),
(31, 201501234, 'PE 2', '5', '0', 0, 154.25, 'I/17/18'),
(32, 201501234, 'PI 10(SSP)', '2.25', '3', 6.75, 161, 'I/17/18'),
(33, 201501234, 'THEA 107', '1', '3', 3, 164, 'I/17/18'),
(34, 201501234, 'ENG 103', '2', '3', 6, 170, 'II/17/18'),
(35, 201501234, 'ENG 104', '2.25', '3', 6.75, 176.75, 'II/17/18'),
(36, 201501234, 'HUM 170', '2', '3', 6, 182.75, 'II/17/18'),
(37, 201501234, 'NSTP 2', '1.25', '0', 0, 182.75, 'II/17/18'),
(38, 201501234, 'PHLO 184', '2', '3', 6, 188.75, 'II/17/18'),
(39, 201501234, 'SOC 112', '1.75', '3', 5.25, 194, 'II/17/18'),
(40, 201501234, 'COMA 193', '1.75', '3', 5.25, 199.25, 'I/18/19'),
(41, 201501234, 'COMA 200', 'S', '3', 0, 199.25, 'I/18/19'),
(42, 201501234, 'ENG 5', '1.75', '3', 5.25, 204.5, 'I/18/19'),
(43, 201501234, 'HK 12', '2.25', '0', 0, 204.5, 'l/18/19'),
(44, 201501234, 'SPCM 101', '1.5', '3', 4.5, 209, 'l/18/19'),
(45, 201501234, 'SPCM 104', '2.75', '3', 8.25, 217.25, 'l/18/19'),
(46, 201501234, 'ENG 156', '1.5', '3', 4.5, 221.75, 'll/18/19'),
(47, 201501234, 'ENG 155', '1.25', '3', 3.75, 225.5, 'll/18/19'),
(48, 201501234, 'ENG 102', '1', '3', 3, 228.5, 'll/18/19'),
(49, 201501234, 'ETHICS 1', '1.75', '3', 5.25, 233.75, 'll/18/19'),
(50, 201501234, 'STS 1', '1.75', '3', 5.25, 239, 'll/18/19'),
(51, 201501234, 'COMA 200', 'S', '3', 0, 239, 'l/19/20'),
(52, 201501234, 'ENG 152', '1.25', '3', 3.75, 242.75, 'l/19/20'),
(53, 201501234, 'HK 12', '2.75', '0', 0, 242.75, 'l/19/20'),
(54, 201501234, 'HK 12', '2.25', '0', 0, 242.75, 'l/19/20'),
(55, 201501234, 'THEA 101', '2', '3', 6, 248.75, 'l/19/20'),
(56, 201501234, 'COMA 200', '1', '(1)6', 6, 254.75, 'll/19/20');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `course_name` varchar(80) NOT NULL,
  `degree_id` int(50) NOT NULL,
  `course_number` varchar(30) NOT NULL,
  `number_units` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('Critical Perspectives in the Arts', 1, 'ARTS 1', 3),
('Language and Communication', 1, 'COMA 101', 3),
('Language and Culture', 1, 'COMA 102', 3),
('Introduction to Discourse Analysis', 1, 'COMA 103', 3),
('Principles of Public Relations and Advertising', 1, 'COMA 105', 3),
('Workplace Communication', 1, 'COMA 150', 3),
('Special Problems', 1, 'COMA 190', 3),
('Introduction to Research', 1, 'COMA 192', 3),
('Workshop', 1, 'COMA 193', 3),
('Undergraduate Seminar', 1, 'COMA 199', 1),
('Undergraduate Thesis', 1, 'COMA 200', 3),
('Practicum', 1, 'COMA 200a', 3),
('Critical Perspectives in Communication', 1, 'COMM 10', 3),
('Rereading the Literary Canons', 1, 'ENG 100', 3),
('English Prose Styles', 1, 'ENG 101', 3),
('Argumentative Writing', 1, 'ENG 104', 3),
('Ethics and Moral Reasoning in Everyday Life', 1, 'ETHICS 1', 3),
('Philippine History', 1, 'HIST 1', 3),
('Wellness and Basic Injury Management', 1, 'HK 11', 0),
('Human Kinetics Activities', 1, 'HK 12', 0),
('Advanced Human Kinetics Activities', 1, 'HK 13', 0),
('Critical Theories', 1, 'HUM 100', 3),
('Visual Culture', 1, 'HUM 101', 3),
('New Media Art', 1, 'HUM 102', 3),
('Culture and Arts Management', 1, 'HUM 104', 3),
('Philippine Art and Society', 1, 'HUM 170', 3),
('Kasaysayan ng Pilipinas', 1, 'KAS 1', 3),
('National Service Training Program I', 1, 'NSTP 1', 0),
('National Service Training Program II', 1, 'NSTP 2', 0),
('The Life and Works of Jose Rizal', 1, 'PI 10', 3),
('Rhetoric', 1, 'SPCM 101', 3),
('Voice and Diction', 1, 'SPCM 102', 3),
('Occasional Speeches', 1, 'SPCM 104', 3),
('Science, Technology, and Society', 1, 'STS 1', 3),
('History of the Theatre', 1, 'THEA 101', 3),
('Theatre Communication', 1, 'THEA 102', 3),
('Philippine Theatre', 1, 'THEA 103', 3),
('Oral Interpretation', 2, 'SPCM 151', 3),
('Philippine Public Address', 2, 'SPCM 152', 3),
('Group Discussion and Leadership', 2, 'SPCM 153', 3),
('Communication in Public Relations', 2, 'SPCM 154', 3),
('Rhetorical Criticism', 2, 'SPCM 155', 3),
('Speech Communication Strategies for Classroom Instruction', 2, 'SPCM 156', 3),
('Speech Making and Evaluation', 2, 'SPCM 157', 3),
('Speech Communication in Conflict Resolution', 2, 'SPCM 158', 3),
('Nonverbal Communication', 2, 'SPCM 159', 3),
('Critical Writing', 3, 'ENG 151', 3),
('Creative Writing', 3, 'ENG 152', 3),
('Philippine Literature in English', 3, 'ENG 153', 3),
('Science and Technology in Literature', 3, 'ENG 154', 3),
('Writing Creative Nonfiction', 3, 'ENG 155', 3),
('Mythology and Folklore', 3, 'ENG 156', 3),
('Reading Young Adult Narratives', 3, 'ENG 157', 3),
('Playwriting', 3, 'ENG 158', 3),
('Ang Pagsulat ng Kwentong Popular', 3, 'FIL 150', 3),
('Teorya at Praktika ng Pagsasalin', 3, 'FIL 155', 3),
('Acting', 4, 'THEA 151', 3),
('Directing', 4, 'THEA 152', 3),
('Asian Theater', 4, 'THEA 153', 3),
('Drama for Children', 4, 'THEA 154', 3),
('Theater Space and Stage Design', 4, 'THEA 155', 3),
('The Dynamics and Aesthetics of Community Theater', 4, 'THEA 156', 3),
('Play Production', 4, 'THEA 157', 3),
('Critical Perspectives in the Arts', 5, 'ARTS 1', 3),
('Critical Perspectives in Communication', 5, 'COMM 10', 3),
('General Economics', 5, 'ECON 11', 3),
('Ethics and Moral Reasoning in Everyday Life', 5, 'ETHICS 1', 3),
('Philippine History', 5, 'HIST 1', 3),
('Wellness and Basic Injury Management', 5, 'HK 11', 0),
('Human Kinetics Activities', 5, 'HK 12', 0),
('Advanced Human Kinetics Activities', 5, 'HK 13', 0),
('Kasaysayan ng Pilipinas', 5, 'KAS 1', 3),
('National Service Training Program I', 5, 'NSTP 1', 0),
('National Service Training Program II', 5, 'NSTP 2', 0),
('Fundamental Approaches to Philosophy', 5, 'PHLO 11', 3),
('Ancient Philosophy', 5, 'PHLO 110', 3),
('Medieval Philosophy', 5, 'PHLO 111', 3),
('Modern Philosophy', 5, 'PHLO 112', 3),
('Contemporary Philosophy', 5, 'PHLO 113', 3),
('Logic', 5, 'PHLO 12', 3),
('Philosophical Reasoning', 5, 'PHLO 120', 3),
('Epistemology', 5, 'PHLO 150', 3),
('Philosophy of Science', 5, 'PHLO 160', 3),
('Ethics', 5, 'PHLO 171', 3),
('Practical Ethics', 5, 'PHLO 173', 3),
('Biomedical Ethics', 5, 'PHLO 174', 3),
('Social and Political Philosophy', 5, 'PHLO 176', 3),
('Environmental Ethics', 5, 'PHLO 178', 3),
('Aesthetics', 5, 'PHLO 181', 3),
('Philosophy and Semiotics', 5, 'PHLO 182', 3),
('Feminist Philosophy', 5, 'PHLO 184', 3),
('Critical Perspectives in Filipino Philosophy', 5, 'PHLO 185', 3),
('Philosophy of Language', 5, 'PHLO 195', 3),
('Philosophic Problems', 5, 'PHLO 197', 3),
('The Life and Works of Jose Rizal', 5, 'PI 10', 3),
('Principles of Government and Politics', 5, 'POSC 10', 3),
('Readings in Speculative Thought', 5, 'SPEC', 3),
('Science, Technology, and Society', 5, 'STS 1', 3);

--Subjects for OLD BSCS
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('College Algebra and Trigonometry', 45, 'MATH 17', 3),
('College English', 45, 'ENG 1', 3),
('Discrete Mathematical Structures in Computer Science I', 45, 'CMSC 56', 3),
('Discrete Mathematical Structures in Computer Science II', 45, 'CMSC 57', 3),
('Introduction to Computer Science', 45, 'CMSC 11', 3),
('Analytic Geometry and Calculus I', 45, 'MATH 26', 3),
('Introduction to the Internet', 45, 'CMSC 2', 3),
('College Writing in English', 45, 'ENG 2', 3),
('Elementary Statistics', 45, 'STAT 1', 3),
('Fundamentals of Programming', 45, 'CMSC 21', 3),
('Analytic Geometry and Calculus II', 45, 'MATH 27', 3),
('Analytic Geometry and Calculus III', 45, 'MATH 28', 3),
('Data Structures', 45, 'CMSC 123', 3),
('Logic Design and Digital Computer Circuits', 45, 'CMSC 130', 3),
('Object-Oriented Programming', 45, 'CMSC 22', 3),
('Web Programming', 45, 'CMSC 100', 3),
('Introduction to Computer Organization and Machine-Level Programming', 45, 'CMSC 131', 3),
('File Processing and Database Systems', 45, 'CMSC 127', 3),
('Speech Communication', 45, 'SPCM 1', 3),
('Design and Implementation of Programming Languages', 45, 'CMSC 124', 3),
('Operating Systems', 45, 'CMSC 125', 3),
('Computer Architecture', 45, 'CMSC 132', 3),
('Scientific Writing', 45, 'ENG 10', 3),
('Artificial Intelligence', 45, 'CMSC 170', 3),
('Introduction to Software Engineering', 45, 'CMSC 128', 3),
('Automata and Language Theory', 45, 'CMSC 141', 3),
('Numerical and Symbolic Computation', 45, 'CMSC 150', 3),
('Data Communications and Networking', 45, 'CMSC 137', 3),
('Undergraduate Seminar', 45, 'CMSC 150', 1),
('Undergraduate Thesis', 45, 'CMSC 200', 3),
('Special Problem', 45, 'CMSC 190a', 1),
('Special Problem', 45, 'CMSC 190b', 2),
('Undergraduate Practicum', 45, 'CMSC 190', 3),
('Design and Analysis of Algorithms', 45, 'CMSC 142', 3),
('The Life and Works of Jose Rizal', 45, 'PI 10', 3);

--Subjects for OLD BSSTAT
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('College Algebra and Trigonometry', 52, 'MATH 17', 3),
('Elementary Physics', 52, 'PHYS 1', 3),
('General Biology', 52, 'BIO 1', 3),
('College English', 52, 'ENG 1', 3),
('Mathematical Analysis I', 52, 'MATH 36', 3),
('Mathematical Analysis II', 52, 'MATH 37', 3),
('Mathematical Analysis III', 52, 'MATH 28', 3),
('Elementary Statistics', 52, 'STAT 1', 3),
('Introduction to Computer Science', 52, 'CMSC 11', 3),
('General Biology II', 52, 'BIO 2', 3),
('College Writing in English', 52, 'ENG 2', 3),
('Statistical Methods', 52, 'STAT 101', 3),
('Fundamentals of Programming', 52, 'CMSC 21', 3),
('Fundamentals of Chemistry', 52, 'CHEM 15', 3),
('Experimental Design', 52, 'STAT 162', 3),
('General Economics', 52, 'ECON 11', 3),
('Genetics', 52, 'BIO 30', 3),
('Logic and Matrix Algebra in Statistics', 52, 'STAT 135', 3),
('Introductory Statistical Theory I', 52, 'STAT 144', 3),
('Experimental Design II', 52, 'STAT 172', 3),
('Object-Oriented Programming', 52, 'CMSC 22', 3),
('Speech Communication', 52, 'SPCM 1', 3),
('Applied Regression and Correlation', 52, 'STAT 151', 3),
('Statistical Packages', 52, 'STAT 182', 3),
('Introductory Statistical Theory II', 52, 'STAT 145', 3),
('Survey Designs', 52, 'STAT 163', 3),
('Special Topics', 52, 'STAT 191', 3),
('The Life and Works of Jose Rizal', 52, 'PI 10', 3),
('Undergraduate Practicum', 52, 'STAT 198', 3),
('Analysis of Multivariate Data', 52, 'STAT 175', 3),
('Introductory Statistical Theory III', 52, 'STAT 146', 3),
('Categorical Data Analysis', 52, 'STAT 165', 3),
('Survey Operations', 52, 'STAT 173', 3),
('Speical Problems', 52, 'STAT 190', 3),
('Statistical Computing', 52, 'STAT 181', 3),
('Scientific Writing', 52, 'ENG 10', 3),
('Introductory Time Series Analysis', 52, 'STAT 156', 3),
('Introduction to the Theory of Nonparametric Statistics', 52, 'STAT 147', 3),
('Statistical Quality Control', 52, 'STAT 167', 3),
('Special Problems', 52, 'STAT 190a', 1),
('Special Problems', 52, 'STAT 190b', 2),
('Undergraduate Seminar', 52, 'STAT 199', 1);

--Subjects for OLD BSMATH
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('College English', 46,'ENG 1', 3),
('The Landscape of Mathematics', 46,'MATH 20', 3),
('College Algebra and Trigonometry', 46,'MATH 17', 3),
('College Writing in English', 46,'ENG 2', 3),
('Mathematical Analysis I', 46,'MATH 36', 3),
('Elementary Statistics', 46,'STAT 1', 3),
('Speech Communication', 46,'SPCM 1', 3),
('The Life and Works of Jose Rizal', 46,'PI 10', 3),
('Mathematical Analysis II', 46,'MATH 37', 3),
('Logic and Set Theory', 46,'MATH 101', 3),
('Computer Programming', 46,'AMAT 150', 3),
('Mathematical Analysis III', 46,'MATH 38', 3),
('Elementary Theory of Numbers', 46,'MATH 103', 3),
('Linear Algebra', 46,'MATH 120', 3),
('Metric Geometry', 46,'MATH 130', 3),
('Modern Algebra I', 46,'MATH 111', 3),
('Introductory Combinatorics', 46,'MATH 141', 3),
('Ordinary Differential Equations', 46,'MATH 151', 3),
('Advanced Calculus I', 46,'MATH 155', 3),
('Research Methods in Mathematics', 46,'MATH 195', 3),
('Modern Algebra II', 46,'MATH 112', 3),
('Non-Euclidean Geometries', 46,'MATH 133', 3),
('Projective Geometry', 46,'MATH 135', 3),
('Graph Theory', 46,'MATH 143', 3),
('Partial Differential Equations', 46,'MATH 152', 3),
('Advanced Calculus II', 46,'MATH 156', 3),
('Vector Analysis', 46,'MATH 160', 3),
('Complex Analysis II', 46,'MATH 166', 3),
('Finite Differences', 46,'MATH 170', 3),
('Numerical Analysis I', 46,'MATH 174', 3),
('Numerical Analysis II', 46,'MATH 175', 3),
('Introduction to Probability Theory', 46,'MATH 181', 3),
('Stochastic Processes' , 46,'MATH 182', 3),
('Special Topics', 46,'MATH 191', 3),
('Introductory Topology', 46,'MATH 138', 3),
('Undergraduate Thesis', 46,'MATH 200a', 2),
('Undergraduate Thesis', 46,'MATH 200b', 2),
('Undergraduate Thesis', 46,'MATH 200c', 2),
('Complex Analysis I', 46,'MATH 165', 3),
('Foundations of Mathematics', 46,'MATH 192', 3),
('Special Problem', 46,'MATH 190', 3),
('Undergraduate Seminar', 46,'MATH 199', 1);


--Subjects for OLD BSAgChem
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 53, 'CHEM 16', 3),
('General Chemistry I Laboratory', 53, 'CHEM 16.1', 2),
('General Zoology', 53, 'ZOO 1', 3),
('College Algebra and Trigonometry', 53, 'MATH 17', 3),
('College English', 53, 'ENG 1', 3),
('Philippine History', 53, 'HIST 1', 3),
('General Chemistry II', 53, 'CHEM 17', 3),
('General Chemistry II Laboratory', 53, 'CHEM 17.1', 2),
('Introduction to Plant Science', 53, 'BOT 1', 3),
('General Biology II', 53, 'BIO 2', 3),
('Analytic Geometry and Calculus I', 53, 'MATH 26', 3),
('College Writing in English', 53, 'ENG 2', 3),
('Quantitative Inorganic Analysis', 53, 'CHEM 32', 3),
('Quantitative Inorganic Analysis Laboratory', 53, 'CHEM 32.1', 2),
('General Physics I', 53, 'PHYS 3', 3),
('Analytic Geometry and Calculus II', 53, 'MATH 27', 3),
('Elementary Plant Physiology', 53, 'BOT 20', 3),
('Fundamentals of Crop Science I', 53, 'CRSC I', 3),
('Organic Chemistry I', 53, 'CHEM 43', 3),
('Organic Chemistry I Laboratory', 53, 'CHEM 43.1', 2),
('Analytic Geometry and Calculus III', 53, 'MATH 28', 3),
('General Physics II', 53, 'PHYS 13', 3),
('Introduction to Animal Science', 53, 'ANSC 1', 3),
('Fundamentals of Crop Science II', 53, 'CRSC 2', 3),
('Elementary Statistics', 53, 'STAT 1', 3),
('Organic Chemistry II', 53, 'CHEM 44', 3),
('Organic Chemistry II Laboratory', 53, 'CHEM 44.1', 2),
('Optics and Modern Physics', 53, 'PHYS 23', 3),
('General Microbiology', 53, 'MCB 1', 3),
('Introduction to Livestock and Poultry Production', 53, 'ANSC 2', 3),
('Physical Chemistry I', 53, 'CHEM 111', 3),
('Technical Analysis I', 53, 'CHEM 131', 4),
('General Biochemistry', 53, 'CHEM 161', 4),
('Principles of Soil Science', 53, 'SOIL 1', 3),
('Principles of Crop Protection', 53, 'CRPT 1', 3),
('Physical Chemistry I Laboratory', 53, 'CHEM 111.1', 2),
('General Biochemistry Laboratory', 53, 'CHEM 161.1', 2),
('Modern Analytical Chemistry', 53, 'CMSC 137', 3),
('Introduction to Computer Science', 53, 'CMSC 11', 3),
('Computer Programming', 53, 'AMAT 150', 3),
('Physical Chemistry II', 53, 'CHEM 112', 3),
('Modern Analytical Chemistry Laboratory', 53, 'CHEM 137.1', 2),
('Chemical Literature', 53, 'CHEM 192', 3),
('Structure and Reactivity of Agricultural Chemicals', 53, 'CHEM 185', 3),
('Organic Analysis', 53, 'CHEM 140', 4),
('Genetics', 53, 'BIO 30', 3),
('Technical Analysis II', 53, 'CHEM 133', 4),
('Physical Chemistry II Laboratory', 53, 'CHEM 112.1', 2),
('Inorganic Chemistry', 53, 'CHEM 120', 3),
('Undergraduate Seminar', 53, 'CHEM 199', 1),
('Undergraduate Thesis', 53, 'ACHM 200a', 3),
('Colloquium in Agriculture', 53, 'AGRI 199', 3),
('General Environmental Chemistry', 53, 'CHEM 180', 3),
('Undergraduate Thesis', 53, 'ACHM 200b', 3);


--Subjects for OLD BSChem
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 44, 'CHEM 16', 3),
('General Chemistry I Laboratory', 44, 'CHEM 16.1', 2),
('Introduction to Plant Science ', 44, 'BOT 1', 3),
('General Biology I', 44, 'BIO 1', 3),
('College Algebra and Trigonometry', 44, 'MATH 17', 3),
('College English', 44, 'ENG 1', 3),
('Philippine History', 44, 'HIST 1', 3),
('General Chemistry II', 44, 'CHEM 17', 3),
('General Chemistry II Laboratory', 44, 'CHEM 17.1', 2),
('Introduction to Plant Science', 44, 'BOT 1', 3),
('General Zoology', 44, 'ZOO 1', 3),
('General Biology II', 44, 'BIO 2', 3),
('Analytic Geometry and Calculus I', 44, 'MATH 26', 3),
('College Writing in English', 44, 'ENG 2', 3),
('Quantitative Inorganic Analysis', 44, 'CHEM 32', 3),
('Quantitative Inorganic Analysis Laboratory', 44, 'CHEM 32.1', 2),
('Speech Communication', 44, 'SPCM 1', 3),
('Organic Chemistry I', 44, 'CHEM 43', 3),
('Organic Chemistry I Laboratory', 44, 'CHEM 43.1' 2),
('Analytic Geometry and Calculus II', 44, 'MATH 27', 3),
('Fundamental Physics', 44, 'PHYS 81', 5),
('Organic Chemistry II', 44, 'CHEM 44', 3),
('Organic Chemistry II Laboratory', 44, 'CHEM 44.1', 2),
('Analytic Geometry and Calculus III', 44, 'MATH 28', 3),
('Fundamental Physics II', 44, 'PHYS 82', 5),
('Introduction to Computer Science', 44, 'CMSC 11', 3),
('Computer Programming', 44, 'AMAT 150', 3),
('General Microbiology', 44, 'MCB 1', 3),
('Elementary Statistics', 44, 'STAT 1', 3),
('Physical Chemistry I', 44, 'CHEM 111', 3),
('Organic Analysis', 44, 'CHEM 140', 4),
('General Biochemistry', 44, 'CHEM 161', 4),
('Fundamental Physics III', 44, 'PHYS 83', 5),
('The Life and Works of Jose Rizal', 44, 'PI 10', 3),
('Introduction to Computer Science', 44, 'CHEM 120', 3),
('Physical Chemistry I Laboratory', 44, 'CHEM 111.1', 2),
('Physical Chemistry II', 44, 'CHEM 112', 3),
('Modern Analytical Chemistry', 44, 'CHEM 137', 3),
('General Biochemistry Laboratory', 44, 'CHEM 161.1', 2),
('Chemical Literature', 44, 'CHEM 192', 3),
('Physical Chemistry II Laboratory', 44, 'CHEM 112.1', 2),
('Physical Chemistry III', 44, 'CHEM 115', 3),
('Inorganic Chemistry Laboratory', 44, 'CHEM 120.1', 2),
('Modern Analytical Chemistry Laboratory', 44, 'CHEM 137.1', 2),
('Undergraduate Thesis', 44, 'CHEM 200', 3),
('Industrial Chemistry', 44, 'CHEM 171', 2),
('General Environmental Chemistry', 44, 'CHEM 180', 3),
('Undergraduate Seminar', 44, 'CHEM 199', 2);

--Subjects for OLD BSChem
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 44, 'CHEM 16', 3),
('General Chemistry I Laboratory', 44, 'CHEM 16.1', 2),
('Introduction to Plant Science ', 44, 'BOT 1', 3),
('General Biology I', 44, 'BIO 1', 3),
('College Algebra and Trigonometry', 44, 'MATH 17', 3),
('College English', 44, 'ENG 1', 3),
('Philippine History', 44, 'HIST 1', 3),
('General Chemistry II', 44, 'CHEM 17', 3),
('General Chemistry II Laboratory', 44, 'CHEM 17.1', 2),
('Introduction to Plant Science', 44, 'BOT 1', 3),
('General Zoology', 44, 'ZOO 1', 3),
('General Biology II', 44, 'BIO 2', 3),
('Analytic Geometry and Calculus I', 44, 'MATH 26', 3),
('College Writing in English', 44, 'ENG 2', 3),
('Quantitative Inorganic Analysis', 44, 'CHEM 32', 3),
('Quantitative Inorganic Analysis Laboratory', 44, 'CHEM 32.1', 2),
('Speech Communication', 44, 'SPCM 1', 3),
('Organic Chemistry I', 44, 'CHEM 43', 3),
('Organic Chemistry I Laboratory', 44, 'CHEM 43.1' 2),
('Analytic Geometry and Calculus II', 44, 'MATH 27', 3),
('Fundamental Physics', 44, 'PHYS 81', 5),
('Organic Chemistry II', 44, 'CHEM 44', 3),
('Organic Chemistry II Laboratory', 44, 'CHEM 44.1', 2),
('Analytic Geometry and Calculus III', 44, 'MATH 28', 3),
('Fundamental Physics II', 44, 'PHYS 82', 5),
('Introduction to Computer Science', 44, 'CMSC 11', 3),
('Computer Programming', 44, 'AMAT 150', 3),
('General Microbiology', 44, 'MCB 1', 3),
('Elementary Statistics', 44, 'STAT 1', 3),
('Physical Chemistry I', 44, 'CHEM 111', 3),
('Organic Analysis', 44, 'CHEM 140', 4),
('General Biochemistry', 44, 'CHEM 161', 4),
('Fundamental Physics III', 44, 'PHYS 83', 5),
('The Life and Works of Jose Rizal', 44, 'PI 10', 3),
('Introduction to Computer Science', 44, 'CHEM 120', 3),
('Physical Chemistry I Laboratory', 44, 'CHEM 111.1', 2),
('Physical Chemistry II', 44, 'CHEM 112', 3),
('Modern Analytical Chemistry', 44, 'CHEM 137', 3),
('General Biochemistry Laboratory', 44, 'CHEM 161.1', 2),
('Chemical Literature', 44, 'CHEM 192', 3),
('Physical Chemistry II Laboratory', 44, 'CHEM 112.1', 2),
('Physical Chemistry III', 44, 'CHEM 115', 3),
('Inorganic Chemistry Laboratory', 44, 'CHEM 120.1', 2),
('Modern Analytical Chemistry Laboratory', 44, 'CHEM 137.1', 2),
('Undergraduate Thesis', 44, 'CHEM 200', 3),
('Industrial Chemistry', 44, 'CHEM 171', 2),
('General Environmental Chemistry', 44, 'CHEM 180', 3),
('Undergraduate Seminar', 44, 'CHEM 199', 2);

--Subjects for OLD BSChem
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 44, 'CHEM 16', 3),
('General Chemistry I Laboratory', 44, 'CHEM 16.1', 2),
('Introduction to Plant Science ', 44, 'BOT 1', 3),
('General Biology I', 44, 'BIO 1', 3),
('College Algebra and Trigonometry', 44, 'MATH 17', 3),
('College English', 44, 'ENG 1', 3),
('Philippine History', 44, 'HIST 1', 3),
('General Chemistry II', 44, 'CHEM 17', 3),
('General Chemistry II Laboratory', 44, 'CHEM 17.1', 2),
('Introduction to Plant Science', 44, 'BOT 1', 3),
('General Zoology', 44, 'ZOO 1', 3),
('General Biology II', 44, 'BIO 2', 3),
('Analytic Geometry and Calculus I', 44, 'MATH 26', 3),
('College Writing in English', 44, 'ENG 2', 3),
('Quantitative Inorganic Analysis', 44, 'CHEM 32', 3),
('Quantitative Inorganic Analysis Laboratory', 44, 'CHEM 32.1', 2),
('Speech Communication', 44, 'SPCM 1', 3),
('Organic Chemistry I', 44, 'CHEM 43', 3),
('Organic Chemistry I Laboratory', 44, 'CHEM 43.1' 2),
('Analytic Geometry and Calculus II', 44, 'MATH 27', 3),
('Fundamental Physics', 44, 'PHYS 81', 5),
('Organic Chemistry II', 44, 'CHEM 44', 3),
('Organic Chemistry II Laboratory', 44, 'CHEM 44.1', 2),
('Analytic Geometry and Calculus III', 44, 'MATH 28', 3),
('Fundamental Physics II', 44, 'PHYS 82', 5),
('Introduction to Computer Science', 44, 'CMSC 11', 3),
('Computer Programming', 44, 'AMAT 150', 3),
('General Microbiology', 44, 'MCB 1', 3),
('Elementary Statistics', 44, 'STAT 1', 3),
('Physical Chemistry I', 44, 'CHEM 111', 3),
('Organic Analysis', 44, 'CHEM 140', 4),
('General Biochemistry', 44, 'CHEM 161', 4),
('Fundamental Physics III', 44, 'PHYS 83', 5),
('The Life and Works of Jose Rizal', 44, 'PI 10', 3),
('Introduction to Computer Science', 44, 'CHEM 120', 3),
('Physical Chemistry I Laboratory', 44, 'CHEM 111.1', 2),
('Physical Chemistry II', 44, 'CHEM 112', 3),
('Modern Analytical Chemistry', 44, 'CHEM 137', 3),
('General Biochemistry Laboratory', 44, 'CHEM 161.1', 2),
('Chemical Literature', 44, 'CHEM 192', 3),
('Physical Chemistry II Laboratory', 44, 'CHEM 112.1', 2),
('Physical Chemistry III', 44, 'CHEM 115', 3),
('Inorganic Chemistry Laboratory', 44, 'CHEM 120.1', 2),
('Modern Analytical Chemistry Laboratory', 44, 'CHEM 137.1', 2),
('Undergraduate Thesis', 44, 'CHEM 200', 3),
('Industrial Chemistry', 44, 'CHEM 171', 2),
('General Environmental Chemistry', 44, 'CHEM 180', 3),
('Undergraduate Seminar', 44, 'CHEM 199', 2);

--Subjects for OLD BSChem
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 44, 'CHEM 16', 3),
('General Chemistry I Laboratory', 44, 'CHEM 16.1', 2),
('Introduction to Plant Science ', 44, 'BOT 1', 3),
('General Biology I', 44, 'BIO 1', 3),
('College Algebra and Trigonometry', 44, 'MATH 17', 3),
('College English', 44, 'ENG 1', 3),
('Philippine History', 44, 'HIST 1', 3),
('General Chemistry II', 44, 'CHEM 17', 3),
('General Chemistry II Laboratory', 44, 'CHEM 17.1', 2),
('Introduction to Plant Science', 44, 'BOT 1', 3),
('General Zoology', 44, 'ZOO 1', 3),
('General Biology II', 44, 'BIO 2', 3),
('Analytic Geometry and Calculus I', 44, 'MATH 26', 3),
('College Writing in English', 44, 'ENG 2', 3),
('Quantitative Inorganic Analysis', 44, 'CHEM 32', 3),
('Quantitative Inorganic Analysis Laboratory', 44, 'CHEM 32.1', 2),
('Speech Communication', 44, 'SPCM 1', 3),
('Organic Chemistry I', 44, 'CHEM 43', 3),
('Organic Chemistry I Laboratory', 44, 'CHEM 43.1' 2),
('Analytic Geometry and Calculus II', 44, 'MATH 27', 3),
('Fundamental Physics', 44, 'PHYS 81', 5),
('Organic Chemistry II', 44, 'CHEM 44', 3),
('Organic Chemistry II Laboratory', 44, 'CHEM 44.1', 2),
('Analytic Geometry and Calculus III', 44, 'MATH 28', 3),
('Fundamental Physics II', 44, 'PHYS 82', 5),
('Introduction to Computer Science', 44, 'CMSC 11', 3),
('Computer Programming', 44, 'AMAT 150', 3),
('General Microbiology', 44, 'MCB 1', 3),
('Elementary Statistics', 44, 'STAT 1', 3),
('Physical Chemistry I', 44, 'CHEM 111', 3),
('Organic Analysis', 44, 'CHEM 140', 4),
('General Biochemistry', 44, 'CHEM 161', 4),
('Fundamental Physics III', 44, 'PHYS 83', 5),
('The Life and Works of Jose Rizal', 44, 'PI 10', 3),
('Introduction to Computer Science', 44, 'CHEM 120', 3),
('Physical Chemistry I Laboratory', 44, 'CHEM 111.1', 2),
('Physical Chemistry II', 44, 'CHEM 112', 3),
('Modern Analytical Chemistry', 44, 'CHEM 137', 3),
('General Biochemistry Laboratory', 44, 'CHEM 161.1', 2),
('Chemical Literature', 44, 'CHEM 192', 3),
('Physical Chemistry II Laboratory', 44, 'CHEM 112.1', 2),
('Physical Chemistry III', 44, 'CHEM 115', 3),
('Inorganic Chemistry Laboratory', 44, 'CHEM 120.1', 2),
('Modern Analytical Chemistry Laboratory', 44, 'CHEM 137.1', 2),
('Undergraduate Thesis', 44, 'CHEM 200', 3),
('Industrial Chemistry', 44, 'CHEM 171', 2),
('General Environmental Chemistry', 44, 'CHEM 180', 3),
('Undergraduate Seminar', 44, 'CHEM 199', 2);

--Subjects for OLD BSMST-Math
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 35, 'CHEM 16', 3),
('Undergraduate Seminar', 35, 'CHEM 199', 2);

--Subjects for OLD BSMST-Math
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 36, 'CHEM 16', 3),
('Undergraduate Seminar', 36, 'CHEM 199', 2);

--Subjects for OLD BSMST-Math
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 37, 'CHEM 16', 3),
('Undergraduate Seminar', 37, 'CHEM 199', 2);

--Subjects for OLD BSMST-Math
INSERT INTO `subjects` (`course_name`, `degree_id`, `course_number`, `number_units`) VALUES
('General Chemistry I', 38, 'CHEM 16', 3),
('Undergraduate Seminar', 38, 'CHEM 199', 2);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `committee`
--
ALTER TABLE `committee`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `committee_student`
--
ALTER TABLE `committee_student`
  ADD PRIMARY KEY (`committee_email`,`student_number`);

--
-- Indexes for table `degree_curriculums`
--
ALTER TABLE `degree_curriculums`
  ADD PRIMARY KEY (`degree_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_number`);

--
-- Indexes for table `student_record`
--
ALTER TABLE `student_record`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_number` (`student_number`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`degree_id`,`course_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `degree_curriculums`
--
ALTER TABLE `degree_curriculums`
  MODIFY `degree_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `Foreign_key` FOREIGN KEY (`degree_id`) REFERENCES `degree_curriculums` (`degree_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
