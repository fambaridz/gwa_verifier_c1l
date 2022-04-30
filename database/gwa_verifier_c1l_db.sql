-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2022 at 11:55 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

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
  `course_name` varchar(50) NOT NULL,
  `degree_id` int(50) NOT NULL,
  `course_number` varchar(30) NOT NULL,
  `number_units` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`course_name`),
  ADD KEY `degree_id` (`degree_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `degree_curriculums`
--
ALTER TABLE `degree_curriculums`
  MODIFY `degree_id` int(50) NOT NULL AUTO_INCREMENT;

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