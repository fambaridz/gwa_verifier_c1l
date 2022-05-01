-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2022 at 04:23 PM
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
(54, 'BS Applied Physics', 'BSAPHY', 'Old', 'Computational Physics', 0),
(55, 'BS Applied Physics', 'BSAPHY', 'Old', 'Experimental Physics', 0),
(56, 'BS Applied Physics', 'BSAPHY', 'Old', 'Instrumentation Physics', 0);

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
('Computational Physics', 8, 'PHYS 115', 4),
('Physic of Scientific Instruments', 28, 'APHY 101', 3),
('Practicum', 28, 'APHY 198', 3),
('Undergraduate Seminar', 28, 'APHY 199', 1),
('Undergraduate Thesis', 28, 'APHY 200', 3),
('Mathematical Methods of Physics I', 28, 'PHYS 111', 4),
('Mathematical Methods of Physics II', 28, 'PHYS 112', 4),
('Theoretical Mechanics I', 28, 'PHYS 121', 3),
('Electronic Theory I', 28, 'PHYS 131', 3),
('Electromagnetic Theory II', 28, 'PHYS 132', 3),
('Quantum Physics I', 28, 'PHYS 141', 3),
('Statistical Physics I', 28, 'PHYS 151', 3),
('Experimental Physics II', 28, 'PHYS 192', 3),
('Research Methods in Physics', 28, 'PHYS 195', 3),
('The Life and Works of Jose Rizal', 28, 'PI 10', 3),
('Mathematical Modeling', 54, 'AMAT 110', 3),
('Computer Programming', 54, 'AMAT 150', 3),
('Modelling and Simulation in Environmental Physics', 53, 'APHY 140', 3),
('Computational Physics', 54, 'PHYS 116', 3),
('Introduction to Materials Development', 55, 'APHY 150', 3),
('Microscopy and Spectroscopy for Materials Characterization', 55, 'APHY 160', 3),
('Solid State Physics', 55, 'PHYS 170', 3),
('Electronic Circuits', 56, 'APHY 103', 3),
('Digital Computer Electronics', 56, 'APHY 104', 3),
('Microcomputer-based Instrumentation', 56, 'APHY 105', 3),
('Embedded Systems Programming for instrumentation', 56, 'APHY 132', 3);
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
('Science, Technology, and Society', 5, 'STS 1', 3),
('Rural Sociology', 6, 'AERS 160', 3),
('Introduction to Social and Cultural Anthropology', 6, 'ANTH 10', 3),
('Critical Perspectives in the Arts', 6, 'ARTS 1', 3),
('Critical Perspectives in Communication', 6, 'COMM 10', 3),
('General Economics', 6, 'ECON 11', 3),
('Ethics and Moral Reasoning in Everyday Life', 6, 'ETHICS 1', 3),
('Philippine History', 6, 'HIST 1', 3),
('Introduction to History', 6, 'HIST 10', 3),
('Wellness and Basic Injury Management', 6, 'HK 11', 0),
('Human Kinetics Activities', 6, 'HK 12', 0),
('Advanced Human Kinetics Activities', 6, 'HK 13', 0),
('Kasaysayan ng Pilipinas', 6, 'KAS 1', 3),
('National Service Training Program I', 6, 'NSTP 1', 0),
('National Service Training Program II', 6, 'NSTP 2', 0),
('The Life and Works of Jose Rizal', 6, 'PI 10', 3),
('Principles of Government and Politics', 6, 'POSC 10', 3),
('Foundations of Psychology', 6, 'PSY 10', 3),
('General Principles of Sociology', 6, 'SOC 10', 3),
('Social Organization', 6, 'SOC 100', 3),
('Gender Relations', 6, 'SOC 107', 3),
('Sociology of the Family', 6, 'SOC 110', 3),
('Sociology of Politics', 6, 'SOC 112', 3),
('Sociology of Economic Life', 6, 'SOC 114', 3),
('Sociology of Religion', 6, 'SOC 116', 3),
('Urban Sociology', 6, 'SOC 120', 3),
('Social Psychology', 6, 'SOC 130', 3),
('Attitudes and Persuasion', 6, 'SOC 135', 3),
('Introduction to Demography', 6, 'SOC 140', 3),
('Classical Sociological Theories', 6, 'SOC 151', 3),
('Contemporary Sociological Theories', 6, 'SOC 152', 3),
('Social Change', 6, 'SOC 160', 3),
('Sociology of Development', 6, 'SOC 165', 3),
('Social Program Evaluation', 6, 'SOC 166', 3),
('Social Problems', 6, 'SOC 170', 3),
('Deviance', 6, 'SOC 175', 3),
('Collective Behavior', 6, 'SOC 180', 3),
('Special Topics', 6, 'SOC 191', 3),
('Introduction to Qualitative Social Research', 6, 'SOC 192', 3),
('Research Methodologies in the Social Sciences', 6, 'SOC 195', 2),
('Research Methodologies in the Social Sciences Laboratory', 6, 'SOC 195.1', 1),
('Internship', 6, 'SOC 198', 3),
('Undergraduate Seminar', 6, 'SOC 199', 1),
('Undergraduate Thesis', 6, 'SOC 200', 3),
('Statistics for Social Sciences', 6, 'STAT 166', 3),
('Science, Technology, and Society', 6, 'STS 1', 3);
('Ethics and Moral Reasoning in Everyday Life', 50, 'ETHICS 1', 3),
('Kasaysayan ng Pilipinas', 50, 'KAS 1', 3),
('Philippine History', 50, 'HIST 1', 3),
('Analytic Geometry and Calculus II', 50, 'MATH 27', 3),
('Genetics', 50, 'BIO 30', 3),
('Statistical Methods', 50, 'STAT 101', 3),
('Logic and Matrix Algebra in Statistics', 50, 'STAT 135', 3),
('Wellness and Basic Injury Management', 50, 'HK 11', 0),
('Critical Perspectives in the Arts', 50, 'ARTS 1', 3),
('Analytic Geometry and Calculus III', 50, 'MATH 28', 3),
('Foundations of Computer Science', 50, 'CMSC 12', 3),
('Experimental Designs', 50, 'STAT 162', 3),
('Statistical Packages', 50, 'STAT 182', 3),
('Human Kinetics Activities', 50, 'HK 12', 0),
('Advanced Human Kinetics Activities', 50, 'HK 13', 0),
('Science, Technology, and Society', 50, 'STS 1', 3),
('Fundamentals of Programming', 50, 'CMSC 21', 3),
('General Economics', 50, 'ECON 11', 3),
('Introductory Statistical Theory I', 50, 'STAT 144', 3),
('Response Surface Methodology', 50, 'STAT 168', 3),
('National Service Training Program I', 50, 'NSTP 1', 0),
('Stochastic Processes', 50, 'MATH 182', 3),
('Object-Oriented Programming', 50, 'CMSC 22', 3),
('Foundations of Entrepreneurship', 50, 'ABME 10', 3),
('Introductory Statistical Theory II', 50, 'STAT 145', 3),
('Survey Designs', 50, 'STAT 163', 3),
('National Service Training Program II', 50, 'NSTP 2', 0),
('Critical Perspectives in Communication', 50, 'COMM 10', 3),
('Introductory Statistical Theory II', 50, 'STAT 146', 3),
('Survey Operations', 50, 'STAT 173', 3),
('Analysis of Multivariate Data', 50, 'STAT 175', 3),
('Statistical Computing', 50, 'STAT 181', 3),
('File Processing and Database Systems', 50, 'CMSC 127', 3),
('Introduction to the Theory of Nonparametric Statistics', 50, 'STAT 147', 3),
('Applied Regression and Correlation', 50, 'STAT 151', 3),
('Introductory Time Series Analysis', 50, 'STAT 156', 3),
('Introductory Biostatistics', 50, 'STAT 174', 3),
('Statistical Consulting Laboratory', 50, 'STAT 192.1', 3),
('Practicum', 50, 'COMA 198', 3),
('Writing Scientific Papers', 50, 'ENG 10', 3),
('Introductory Bayesian Statistics', 50, 'STAT 148', 3),
('Categorical Data Analysis', 50, 'STAT 165', 3),
('Special Problems', 50, 'STAT 190', 1),
('Special Topics', 50, 'STAT 191', 3),
('The Life and Works of Jose Rizal', 50, 'PI 10', 3),
('Financial Risk Analysis', 50, 'STAT 157', 3),
('Statistical Quality Control', 50, 'STAT 167', 3),
('Introductory Data Analytics', 50, 'STAT 183', 3),
('Undergraduate Seminar', 50, 'STAT 199', 1),
('University Chemistry', 51, 'CHEM 18', 3),
('University Chemistry Laboratory', 51, 'CHEM 18.1', 3),
('Biology and Applications of Microorganisms', 51, 'MCB 11', 3),
('Analytic Geometry and Calculus II', 51, 'MATH 27', 3),
('Ethics and Moral Reasoning in Everyday Life', 51, 'ETHICS 1', 3),
('Philippine History', 51, 'HIST 1', 3),
('Kasaysayan ng Pilipinas', 51, 'KAS 1', 3),
('Wellness and Basic Injury Management', 51, 'HK 11', 0),
('Chemical Structure and Properties', 51, 'CHEM 19', 3),
('Genetics', 51, 'BIO 30', 3),
('Fundamentals of Crop Science I', 51, 'AGRI 31', 3),
('General Economics', 51, 'ECON 11', 3),
('Human Kinetics Activities', 51, 'HK 12', 0),
('Advanced Human Kinetics Activities', 51, 'HK 13', 0),
('National Service Training Program I', 51, 'NSTP 1', 0),
('Analytic Geometry and Calculus III', 51, 'MATH 28', 3),
('Critical Perspective in the Arts', 51, 'ARTS 1', 3),
('Quantitative Inorganic Analysis', 51, 'CHEM 32', 3),
('Quantitative Inorganic Analysis Laboratory', 51, 'CHEM 32.1', 2),
('University Physics I', 51, 'PHYS 71', 4),
('University Physics Laboratory', 51, 'PHYS 71.1', 1),
('Elementary Plant Physiology', 51, 'BOT 20', 3),
('Farm Management', 51, 'AAE 111', 3),
('Agricultural Marketing I', 51, 'AAE 120', 3),
('National Service Training Program II', 51, 'NSTP 2', 0),
('Organic Chemistry I', 51, 'CHEM 43', 3),
('Organic Chemistry I Laboratory', 51, 'CHEM 43.1', 2),
('University Physics II', 51, 'PHYS 72', 4),
('University Physics II Laboratory', 51, 'PHYS 72.1', 1),
('Introduction to Animal Science', 51, 'AGRI 21', 3),
('Fundamentals of Crop Science II', 51, 'AGRI 32', 3),
('The Life, Works and Writings of Jose Rizal', 51, 'PI 10', 3),
('Organic Chemistry II', 51, 'CHEM 44', 3),
('Organic Chemistry II Laboratory', 51, 'CHEM 44.1', 2),
('Introduction to Livestock and Poultry Production', 51, 'AGRI 22', 3),
('Foundations of Computer Science', 51, 'CMSC 12', 3),
('Fundamentals of Mathematical Computing', 51, 'AMAT 152', 3),
('Agricultural Extension Communication', 51, 'AGRI 61', 3),
('Technical Analysis I', 51, 'CHEM 131', 4),
('Organic Analysis', 51, 'CHEM 140', 4),
('Biochemistry I', 51, 'CHEM 161a', 3),
('Principles of Soil Science', 51, 'AGRI 51', 3),
('Principles of Crop Protection', 51, 'AGRI 41', 3),
('Chemical Information, Literature and Communication', 51, 'CHEM 192', 3),
('Physical Chemistry I', 51, 'CHEM 111', 3),
('Physical Chemistry I Laboratory', 51, 'CHEM 111.1', 2),
('Physical Chemistry II', 51, 'CHEM 112', 3),
('Modern Analytical Chemistry', 51, 'CHEM 137', 3),
('Biochemistry II', 51, 'CHEM 161b', 3),
('Pest Management', 51, 'AGRI 42', 3),
('Physical Chemistry II Laboratory', 51, 'CHEM 112.1', 2),
('Physical Chemistry III', 51, 'CHEM 115', 3),
('Modern Analytical Chemistry Laboratory', 51, 'CHEM 137.1', 2),
('General Biochemistry Laboratory', 51, 'CHEM 161.1', 2),
('Critical Perspectives in Communication', 51, 'COMM 10', 3),
('Practicum', 51, 'CHEM 198', 3),
('Science, Technology and Society', 51, 'STS 1', 3),
('Technical Analysis II', 51, 'CHEM 133', 4),
('Inorganic Chemistry', 51, 'CHEM 120', 3),
('Undergraduate Seminar', 51, 'CHEM 199', 1),
('Ethics, Laws and Policies in Agriculture', 51, 'AGRI 171', 3),
('Undergraduate Thesis', 51, 'ACHM 200', 3),
('General Environmental Chemistry', 51, 'CHEM 180', 3),
('Structure and Reactivity of Agricultural Chemicals', 51, 'CHEM 185', 3),
('Colloquium in Agriculture', 51, 'AGRI 199', 1),
('Undergraduate Thesis', 51, 'ACHM 200', 3),
('College English', 28, 'ENG 1', 3),
('College Writing in English', 28, 'ENG 2', 3),
('Philosophical Analysis', 28, 'PHLO 1', 3),
('Foundations of Behavioral Sciences', 28, 'SOSC 1', 3),
('The Life and Works of Dr. Jose Rizal', 28, 'PI 10', 3),
('Information Technology Literacy', 28, 'IT 1', 3),
('Problem Solving', 28, 'MATH 2', 3),
('Language and Communication', 28, 'COMA 101', 3),
('Language and Culture', 28, 'COMA 104', 3),
('Principles of Public Relations', 28, 'COMA 105', 3),
('Introduction to Research', 28, 'COMA 192', 3),
('Workshop in Communication Arts', 28, 'COMA 193', 3),
('Thesis', 28, 'COMA 200', 3),
('Practicum', 28, 'COMA 200-a', 3),
('Masterpieces in World Literature', 28, 'ENG 4', 3),
('English Prose Styles', 28, 'ENG 101', 3),
('Business and Professional Reports', 28, 'ENG 102', 3),
('Mga Piling Katha ng mga Manunulat na Pilipino', 28, 'FIL 20', 3),
('Poklorikong Pilipino', 28, 'FIL 21', 3),
('Voice and Diction', 28, 'SPCM 102', 3),
('Occasional Speeches', 28, 'SPCM 104', 3),
('Philippine Art and Society', 28, 'HUM 170', 3),
('Social Psychology', 28, 'SOC 130', 3),
('History of the Theater', 28, 'THEA 101', 3),
('Theater Communication', 28, 'THEA 107', 3),
('Rhetoric', 29, 'SPCM 101', 3),
('Oral Interpretation', 29, 'SPCM 103', 3),
('Philippine Public Address', 29, 'SPCM 105', 3),
('Group Discussion and Leadership', 29, 'SPCM 106', 3),
('Communication in Public Relations', 29, 'SPCM 107', 3),
('Critical Writing', 30, 'ENG 103', 3),
('Argument', 30, 'ENG 104', 3),
('Playwriting', 30, 'ENG 105', 3),
('Creative Writing', 30, 'ENG 106', 3),
('Mythology and Folklore', 30, 'ENG 107', 3),
('Creative Nonfiction', 30, 'ENG 155', 3),
('Methods of Language Teaching', 30, 'COMA 141', 3),
('Directed Study', 30, 'COMA 190', 3),
('Pagsulat ng Kwentong Popular', 30, 'FIL 150', 3),
('Philippine Literature in English', 30, 'HUM 150', 3),
('Science and Technology in Literature', 30, 'HUM 160', 3),
('Acting', 31, 'THEA 108', 3),
('Directing', 31, 'THEA 109', 3),
('The Dynamics and Aesthetics of Community Theater', 31, 'THEA 114', 3),
('Drama for Children', 31, 'THEA 115', 3),
('National Service Training Program I', 28, 'NSTP 1', 0),
('National Service Training Program II', 28, 'NSTP 2', 0),
('Finite Mathematics', 34, 'AMAT 19', 3),
('Algebra and Trigonometry', 34, 'MATH 17', 5),
('College English', 34, 'ENG 1', 3),
('Foundations of Physical Fitness', 34, 'PE 1', 0),
('Logic Set Theory', 34, 'MATH 101', 3),
('Mathematical Analysis II', 34, 'MATH 37', 5),
('Computer Programming', 34, 'AMAT 150', 3),
('Speech Communication', 34, 'SPCM 1', 3),
('Basic Course', 34, 'PE 2', 0),
('Advanced Course', 34, 'PE 3', 0),
('Linear Algebra', 34, 'MATH 120', 3),
('Mathematical Analysis III', 34, 'MATH 38', 3),
('Mathematical Modeling', 34, 'AMAT 110', 3),
('The Life and Works of Jose Rizal', 34, 'PI 10', 3),
('National Service Training Program I', 34, 'NSTP 1', 0),
('National Service Training Program II', 34, 'NSTP 2', 0),
('Introduction to Probability Theory', 34, 'MATH 181', 3),
('Ordinary Differential Equations', 34, 'MATH 151', 3),
('Numerical Analysis I', 34, 'MATH 174', 3),
('Research Methods in Mathematics', 34, 'MATH 195', 3),
('Numerical Analysis II', 34, 'MATH 175', 3),
('Practicum', 34, 'AMAT 198', 3),
('Special Problems', 34, 'AMAT 190', 3),
('Undergraduate Seminar', 34, 'AMAT 199', 1),
('General Biology I', 36, 'BIO 1', 3),
('General Chemistry I', 36, 'CHEM 16', 5),
('College Algebra', 36, 'MATH 11', 3),
('Foundations of Physical Fitness', 36, 'PE 1', 0),
('Biodiversity', 36, 'BIO 3', 5),
('General Chemistry II', 36, 'CHEM 17', 5),
('College Writing in English', 36, 'ENG 2', 3),
('Plane Trigonometry', 36, 'MATH 14', 3),
('Basic Course', 36, 'PE 1', 0),
('Advanced Course', 36, 'PE 2', 0),
("Earth's Processes & Biological Systems", 36, 'BIO 70', 3),
('Intermediate Botany', 36, 'BOT 3', 3),
('Basic Organic Chemistry', 36, 'CHEM 40', 4),
('Analytic Geometry and Calculus I', 36, 'MATH 26', 3),
('General Microbiology', 36, 'MCB 1', 3),
('General Physics I', 36, 'PHYS 3', 3),
('Genetics', 36, 'BIO 30', 3),
('Principles of Ecology', 36, 'BIO 150', 3),
('General Biochemistry', 36, 'CHEM 160', 3),
('Intermediate Zoology', 36, 'ZOO 3', 3),
('Introductory Molecular Biology', 36, 'BIO 101', 3),
('Elementary Statistics', 36, 'STAT 1', 3),
('Cell Biology', 36, 'BIO 120', 3),
('Evolutionary Biology', 36, 'BIO 140', 3),
('Writing of Scientific Papers', 36, 'ENG 10', 3),
('Undergraduate Seminar', 36, 'BIO 199', 1),
('Mga Piling Katha ng mga Manunulat na Pilipino', 36, 'FIL 20', 3),
('The Life and Works of Jose Rizal', 36, 'PI 100', 3);

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
