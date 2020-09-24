-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for budget-organizer
CREATE DATABASE IF NOT EXISTS `budget-organizer` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `budget-organizer`;

-- Dumping structure for table budget-organizer.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int(100) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(50) NOT NULL DEFAULT '',
  `transaction_type` varchar(50) NOT NULL DEFAULT '',
  `location` varchar(50) DEFAULT 'Store',
  `date` varchar(50) DEFAULT '',
  `amount` decimal(10,0) DEFAULT 0,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_transaction_user` (`user_id`) USING BTREE,
  CONSTRAINT `FK_transaction_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table budget-organizer.transaction: ~4 rows (approximately)
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` (`id`, `type`, `description`, `transaction_type`, `location`, `date`, `amount`, `user_id`) VALUES
	(16, 'expense', 'Vacation', 'transport', 'www.priceline.com', '2020-09-21', 500, 2),
	(17, 'income', 'Tesla', 'dividend', 'www.tesla.com', '2020-09-13', 300, 2),
	(18, 'expense', 'Electricity', 'bill', 'www.domino.sc.com', '2020-08-20', 45, 2),
	(19, 'expense', 'Pay check', 'salary', 'Bank of America', '2020-09-18', 1400, 2);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;

-- Dumping structure for table budget-organizer.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `initial_budget` decimal(50,0) DEFAULT 0,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table budget-organizer.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `initial_budget`, `first_name`, `last_name`, `password`) VALUES
	(2, 'lyoumbi@gmail.com', 3000, 'Lionel', 'Youmbi', '$2a$10$kBNPiPY4CFeGeTfS6uGhs.rHM1QicsLsQhr.QfOlIy1T6MjfcZH1.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
