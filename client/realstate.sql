-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2023 at 04:00 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realstate-old`
--

-- --------------------------------------------------------

--
-- Table structure for table `development`
--

CREATE TABLE `development` (
  `id` int(11) NOT NULL,
  `bannerImg` varchar(255) DEFAULT NULL,
  `devName` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `propertyType` varchar(255) DEFAULT NULL,
  `buildingType` varchar(255) DEFAULT NULL,
  `completiondate` varchar(255) DEFAULT NULL,
  `units` varchar(255) DEFAULT NULL,
  `floors` varchar(255) DEFAULT NULL,
  `areaCity` varchar(255) DEFAULT NULL,
  `developerName` varchar(255) DEFAULT NULL,
  `architectName` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `employee_photo` varchar(255) DEFAULT NULL,
  `availavility` varchar(255) DEFAULT NULL,
  `developmentImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `assignedBy` varchar(255) DEFAULT NULL,
  `adminMessage` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `agentId` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `custId` varchar(255) DEFAULT NULL,
  `customerNName` varchar(255) DEFAULT NULL,
  `emailId` varchar(255) DEFAULT NULL,
  `agentType` varchar(255) DEFAULT NULL,
  `phoneNo` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `locality` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `featuredProperty` varchar(255) DEFAULT NULL,
  `propertyFor` varchar(255) DEFAULT NULL,
  `propertyType` varchar(255) DEFAULT NULL,
  `thePrice` varchar(255) DEFAULT NULL,
  `securityDeposit` varchar(255) DEFAULT NULL,
  `beds` varchar(255) DEFAULT NULL,
  `baths` varchar(255) DEFAULT NULL,
  `kitchenSize` varchar(255) DEFAULT NULL,
  `buildupArea` varchar(255) DEFAULT NULL,
  `leaseDuration` varchar(255) DEFAULT NULL,
  `serventQuarters` varchar(255) DEFAULT NULL,
  `calling` varchar(255) DEFAULT NULL,
  `appliances` varchar(255) DEFAULT NULL,
  `floorSize` varchar(255) DEFAULT NULL,
  `flooringType` varchar(255) DEFAULT NULL,
  `dateAvailable` varchar(255) DEFAULT NULL,
  `propertyDesc` varchar(255) DEFAULT NULL,
  `accomodation` varchar(255) DEFAULT NULL,
  `plotSize` varchar(255) DEFAULT NULL,
  `yourBuilt` varchar(255) DEFAULT NULL,
  `parking` varchar(255) DEFAULT NULL,
  `services` varchar(255) DEFAULT NULL,
  `nearBylocality` varchar(255) DEFAULT NULL,
  `propertyImages` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `address`, `locality`, `street`, `state`, `city`, `zipcode`, `featuredProperty`, `propertyFor`, `propertyType`, `thePrice`, `securityDeposit`, `beds`, `baths`, `kitchenSize`, `buildupArea`, `leaseDuration`, `serventQuarters`, `calling`, `appliances`, `floorSize`, `flooringType`, `dateAvailable`, `propertyDesc`, `accomodation`, `plotSize`, `yourBuilt`, `parking`, `services`, `nearBylocality`, `propertyImages`, `createdAt`, `updatedAt`) VALUES
(1, 'ikkhhk', 'mmhjk', 'j', 'jg', 'gjn', 'gjn', 'n', 'gujn', 'uuygb', 'juy', 'gnunuknjhng', 'kun', 'g', 'jh', 'bgjh', 'gj', 'bbj', 'hg', 'jhmbg', 'jkbg', 'jhg', 'jhn', 'gjhn', 'gjh', 'gjuy', 'fb', 'uy', 'fb', '[{\"id\":1,\"socialname\":\"Website\",\"place\":\"58656\",\"name\":\"543853\"}]', '[\"WhatsApp Image 2023-04-04 at 22.58.20.jpeg\",\"WhatsApp Image 2023-04-04 at 22.50.33.jpeg\",\"WhatsApp Image 2023-04-04 at 22.50.32 (1).jpeg\"]', '2023-04-23 12:45:02', '2023-04-23 12:45:02');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `agentName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `reviewFrom` varchar(255) DEFAULT NULL,
  `reviewDesc` varchar(255) DEFAULT NULL,
  `knowledge` varchar(255) DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `responsive` varchar(255) DEFAULT NULL,
  `nrgoation` varchar(255) DEFAULT NULL,
  `punctuality` varchar(255) DEFAULT NULL,
  `approval` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-development.js'),
('create-leads.js'),
('create-payment.js'),
('create-properties.js'),
('create-reviews.js'),
('create-user.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `userType` varchar(255) DEFAULT NULL,
  `authenticated` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `sales` varchar(255) DEFAULT NULL,
  `specialities` varchar(255) DEFAULT NULL,
  `employee_photo` varchar(255) DEFAULT NULL,
  `aboutyou` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `contact`, `email`, `userType`, `authenticated`, `username`, `password`, `status`, `address`, `designation`, `experience`, `sales`, `specialities`, `employee_photo`, `aboutyou`, `createdAt`, `updatedAt`) VALUES
(1, 'shivendra', NULL, '8103740921', 'neelam0404singh@gmail.com', 'superadmin', 'Yes', 'username', '$2a$08$jaXZSwkV/GytCAW7uXW/R.cSUd5NyFosovrfEfk38.7iYvl0cR1ay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-23 11:52:27', '2023-04-23 11:56:32'),
(2, 'agent', NULL, '8103740921', 'singh2495@gmail.com', 'Agent', 'Yes', 'username', '$2a$08$llRr0G2uerZwKwKYfC8/leU7CQBIvg1kNFteKaFlWc0/NxFdYsc8C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-23 12:03:28', '2023-04-23 12:03:28'),
(3, 'username', NULL, '8103740921', 'creato.shivendra@gmail.com', 'Agent', 'No', 'username', '$2a$08$3dCB/g/4UChOpbqDP5HiWenD5T0gjsA58MWtU5sGggVxs7wc5DGQK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-23 12:05:32', '2023-04-23 12:05:32'),
(4, 'shivendra', 'null', '8103740921', 'shivendra.s@tataelxsi.co.in', 'Agent', 'Yes', 'users', '$2a$15$XqOj1N4R9bXVNgVB4wjxO.MrWU3N1.F2.g7Fcg1rGqrWknObqirF2', NULL, 'null', 'null', 'null', 'null', 'null', 'null', 'aboutyou', '2023-04-23 12:08:19', '2023-04-23 12:39:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `development`
--
ALTER TABLE `development`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `development`
--
ALTER TABLE `development`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
