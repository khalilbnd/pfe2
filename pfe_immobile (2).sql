-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 04, 2023 at 12:01 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pfe_immobile`
--

-- --------------------------------------------------------

--
-- Table structure for table `appartement`
--

DROP TABLE IF EXISTS `appartement`;
CREATE TABLE IF NOT EXISTS `appartement` (
  `appartement_id` varchar(255) NOT NULL,
  `appartement_name` varchar(255) NOT NULL,
  `etage_id` varchar(255) NOT NULL,
  `purchased_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`appartement_id`),
  KEY `etage_id` (`etage_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appartement`
--

INSERT INTO `appartement` (`appartement_id`, `appartement_name`, `etage_id`, `purchased_by`) VALUES
('634b9b69-17b3-490c-addc-f5b19dec6de7', 'AADL  - Bloc 1 - Etage 1 - Appartement 1', '95c547d5-6d0b-4408-b3fe-775bdf3c7e0f', NULL),
('a17641c2-c7ba-44bb-9d4e-fc093e3dfb71', 'OPGI - Bloc 1 - Etage 1 - Appartement 1', '88ccdb5e-c18c-4f5b-8784-a4f42cf17bf1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bloc`
--

DROP TABLE IF EXISTS `bloc`;
CREATE TABLE IF NOT EXISTS `bloc` (
  `bloc_id` varchar(255) NOT NULL,
  `bloc_name` varchar(255) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  PRIMARY KEY (`bloc_id`),
  KEY `project_id` (`project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bloc`
--

INSERT INTO `bloc` (`bloc_id`, `bloc_name`, `project_id`) VALUES
('879fa570-62f1-43fc-8f5e-e3faccaa5342', 'AADL  - Bloc 1', '73c70a48-f4ca-47a7-85e7-1bd30eff344a'),
('6da4627f-cc64-488d-aded-f53a038bf1db', 'OPGI - Bloc 1', 'ded836c1-5a13-4c55-9d9d-d08092469e5a');

-- --------------------------------------------------------

--
-- Table structure for table `etage`
--

DROP TABLE IF EXISTS `etage`;
CREATE TABLE IF NOT EXISTS `etage` (
  `etage_id` varchar(255) NOT NULL,
  `etage_name` varchar(255) NOT NULL,
  `bloc_id` varchar(255) NOT NULL,
  PRIMARY KEY (`etage_id`),
  KEY `bloc_id` (`bloc_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `etage`
--

INSERT INTO `etage` (`etage_id`, `etage_name`, `bloc_id`) VALUES
('95c547d5-6d0b-4408-b3fe-775bdf3c7e0f', 'AADL  - Bloc 1 - Etage 1', '879fa570-62f1-43fc-8f5e-e3faccaa5342'),
('88ccdb5e-c18c-4f5b-8784-a4f42cf17bf1', 'OPGI - Bloc 1 - Etage 1', '6da4627f-cc64-488d-aded-f53a038bf1db');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `project_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `image_url`, `project_id`) VALUES
('42d5f2bd-376e-465c-b309-07657a5530a4', 'uploads/IMG20230601182321.jpg', '73c70a48-f4ca-47a7-85e7-1bd30eff344a'),
('120edfe7-020a-4178-8f77-d4b4f4d89095', 'uploads/IMG20230601182321.jpg', 'ded836c1-5a13-4c55-9d9d-d08092469e5a'),
('6d23ec9a-2977-45bf-839c-96882ad8b556', 'uploads/pexels-binyamin-mellish-186077.png', 'c9efe428-24e6-4429-a9a6-f9d63434ef00');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `project_id` varchar(255) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_desc` varchar(255) NOT NULL,
  `project_status` varchar(15) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_id`, `project_name`, `project_desc`, `project_status`) VALUES
('ded836c1-5a13-4c55-9d9d-d08092469e5a', 'OPGI', 'dsfsdfsdf', 'Fini'),
('73c70a48-f4ca-47a7-85e7-1bd30eff344a', 'AADL ', 'FSDFSFDSFSDFSDF', 'En Cours');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`) VALUES
(1, 'John', 'khalil@example.com', '1234'),
(2, 'khalil bnd', 'beneddrakhalil@gmail.com', '159632'),
(3, 'daifou', 'daifou@gmail.com', '1234'),
(4, 'khalil bnd', 'bnd@bnd.com', '123456');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
