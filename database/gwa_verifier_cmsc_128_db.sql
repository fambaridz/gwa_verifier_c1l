-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2022 at 08:53 AM
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
  `account_made_by` varchar(50) NOT NULL,
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
  `grade` float NOT NULL,
  `units` float NOT NULL,
  `enrolled` float NOT NULL,
  `running_total` double NOT NULL,
  `term` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_record`
--

INSERT INTO `student_record` (`id`, `student_number`, `course_number`, `grade`, `units`, `enrolled`, `running_total`, `term`) VALUES
(1, 201501234, 'ENG 1(AH)', 2, 3, 6, 6, '18 I/15/16'),
(2, 201501234, 'FIL 20', 2.25, 3, 6.75, 12.75, '18 I/15/16'),
(3, 201501234, 'IT 1(MST)', 2, 3, 6, 18.75, '18 I/15/16'),
(4, 201501234, 'PE 1', 2, 0, 0, 18.75, '18 I/15/16'),
(5, 201501234, 'PHLO1(SSP)', 1.75, 3, 5.25, 24, '18 I/15/16'),
(6, 201501234, 'PSY 1(SSP)', 1.75, 3, 5.25, 29.25, '18 I/15/16'),
(7, 201501234, 'SPCM 1(AH)', 1.75, 3, 5.25, 34.5, '18 I/15/16'),
(8, 201501234, 'ENG 2(AH)', 1.5, 3, 4.5, 39, '18 II/15/16'),
(9, 201501234, 'HUM 1(AH)', 1.5, 3, 4.5, 43.5, '18 II/15/16'),
(10, 201501234, 'HUM 2(AH)', 1.5, 3, 4.5, 48, '18 II/15/16'),
(11, 201501234, 'MATH1(MST)', 2, 3, 6, 54, '18 II/15/16'),
(12, 201501234, 'MATH2(MST)', 2, 3, 6, 60, '18 II/15/16'),
(13, 201501234, 'SOSC1(SSP)', 2.5, 3, 7.5, 67.5, '18 II/15/16'),
(14, 201501234, 'COMA 101', 1.25, 3, 3.75, 71.25, '20 I/16/17'),
(15, 201501234, 'ENG 4', 2, 3, 6, 77.25, '20 I/16/17'),
(16, 201501234, 'JAP 10', 1.75, 3, 5.25, 82.5, '20 I/16/17'),
(17, 201501234, 'MATH 17', 1.75, 5, 8.75, 91.25, '20 I/16/17'),
(18, 201501234, 'NASC3(MST)', 2, 3, 6, 97.25, '20 I/16/17'),
(19, 201501234, 'NSTP 1', 1.75, 0, 0, 97.25, '20 I/16/17'),
(20, 201501234, 'SPCM 102', 1.75, 3, 5.25, 102.5, '20 I/16/17'),
(21, 201501234, 'COMA 104', 1.25, 3, 3.75, 106.25, '18 II/16/17'),
(22, 201501234, 'FIL 21', 2, 3, 6, 112.25, '18 II/16/17'),
(23, 201501234, 'JAP 11', 1.75, 3, 5.25, 117.5, '18 II/16/17'),
(24, 201501234, 'MGT 101', 1.5, 3, 4.5, 122, '18 II/16/17'),
(25, 201501234, 'SOC 130', 2.25, 3, 6.75, 128.75, '18 II/16/17'),
(26, 201501234, 'STAT 1', 1.75, 3, 5.25, 134, '18 II/16/17'),
(27, 201501234, 'ENG 101', 2, 3, 6, 140, '18 I/17/18'),
(28, 201501234, 'COMA 192', 1, 3, 3, 143, '18 I/17/18'),
(30, 201501234, 'HUM 150', 1.75, 3, 5.25, 154.25, '18 I/17/18'),
(31, 201501234, 'PE 2', 5, 0, 0, 154.25, '18 I/17/18'),
(32, 201501234, 'PI 10(SSP)', 2.25, 3, 6.75, 161, '18 I/17/18'),
(33, 201501234, 'THEA 107', 1, 3, 3, 164, '18 I/17/18'),
(34, 201501234, 'ENG 103', 2, 3, 6, 170, '15 II/17/18'),
(35, 201501234, 'ENG 104', 2.25, 3, 6.75, 176.75, '15 II/17/18'),
(36, 201501234, 'HUM 170', 2, 3, 6, 182.75, '15 II/17/18'),
(37, 201501234, 'NSTP 2', 1.25, 0, 0, 182.75, '15 II/17/18'),
(38, 201501234, 'PHLO 184', 2, 3, 6, 188.75, '15 II/17/18'),
(39, 201501234, 'SOC 112', 1.75, 3, 5.25, 194, '15 II/17/18'),
(40, 201501234, 'COMA 193', 1.75, 3, 5.25, 199.25, '15 I/18/19'),
(41, 201501234, 'COMA 200', S, 3, 0, 199.25, '15 I/18/19'),
(42, 201501234, 'ENG 5', 1.75, 3, 5.25, 204.5, '15 I/18/19');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
