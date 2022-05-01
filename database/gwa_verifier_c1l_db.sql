-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2022 at 11:22 AM
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
(26, 'BS Statistics', 'BSStat', 'New', '', 143),
(27, 'BS Agricultural Chemistry', 'BSAgChem', 'New', '', 190),
(28, 'BA Communication Arts', 'BACA', 'Old', '', 141),
(29, 'BA Communication Arts', 'BACA', 'Old', 'Speech Communication', 141),
(30, 'BA Communication Arts', 'BACA', 'Old', 'Writing', 141),
(31, 'BA Communication Arts', 'BACA', 'Old', 'Theater Arts', 141),
(32, 'BA Philosophy', 'BAPHLO', 'Old', '', 0),
(33, 'BA Sociology', 'BASOCIO', 'Old', '', 0),
(34, 'BS Applied Mathematics', 'BSAMAT', 'Old', '', 145),
(35, 'BS Applied Physics', 'BSAPHY', 'Old', '', 0),
(36, 'BS Biology', 'BSBIO', 'Old',  'Cell and Molecular Biolgoy', 153),
(37, 'BS Biology', 'BSBIO', 'Old', 'Ecology', 153),
(38, 'BS Biology', 'BSBIO', 'Old', 'Genetics', 153),
(39, 'BS Biology', 'BSBIO', 'Old', 'Microbiology', 153),
(40, 'BS Biology', 'BSBIO', 'Old', 'Plant Biology', 153),
(41, 'BS Biology', 'BSBIO', 'Old', 'Systematics', 153),
(42, 'BS Biology', 'BSBIO', 'Old', 'Wildlife Biology and Zoology', 153),
(43, 'BS Chemistry', 'BSChem', 'Old', '', 160),
(44, 'BA Statistics', 'BSStat', 'Old', '', 149),
(45, 'BA Computer Science', 'BSCS', 'Old', '', 141),
(46, 'BS Agricultural Chemistry', 'BSAgChem', 'Old', '', 194),
(47, 'BS Mathematics', 'BSMath', 'Old', '', 139),
(48, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', '', 0),
(49, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Mathematics', 144),
(50, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Biology', 146),
(51, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Chemistry', 145),
(52, 'BS Mathematics and Science Teaching', 'BSMST', 'Old', 'Physics', 141);

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
