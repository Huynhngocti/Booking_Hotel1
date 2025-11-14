-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_booking
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_type_id` int NOT NULL,
  `room_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` smallint NOT NULL,
  `status` enum('Available','Occupied','Maintenance') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Available',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `room_number` (`room_number`),
  UNIQUE KEY `room_number_2` (`room_number`),
  UNIQUE KEY `room_number_3` (`room_number`),
  UNIQUE KEY `room_number_4` (`room_number`),
  UNIQUE KEY `room_number_5` (`room_number`),
  UNIQUE KEY `room_number_6` (`room_number`),
  UNIQUE KEY `room_number_7` (`room_number`),
  UNIQUE KEY `room_number_8` (`room_number`),
  UNIQUE KEY `room_number_9` (`room_number`),
  UNIQUE KEY `room_number_10` (`room_number`),
  UNIQUE KEY `room_number_11` (`room_number`),
  UNIQUE KEY `room_number_12` (`room_number`),
  UNIQUE KEY `room_number_13` (`room_number`),
  UNIQUE KEY `room_number_14` (`room_number`),
  UNIQUE KEY `room_number_15` (`room_number`),
  UNIQUE KEY `room_number_16` (`room_number`),
  UNIQUE KEY `room_number_17` (`room_number`),
  UNIQUE KEY `room_number_18` (`room_number`),
  UNIQUE KEY `room_number_19` (`room_number`),
  UNIQUE KEY `room_number_20` (`room_number`),
  UNIQUE KEY `room_number_21` (`room_number`),
  UNIQUE KEY `room_number_22` (`room_number`),
  UNIQUE KEY `room_number_23` (`room_number`),
  UNIQUE KEY `room_number_24` (`room_number`),
  UNIQUE KEY `room_number_25` (`room_number`),
  UNIQUE KEY `room_number_26` (`room_number`),
  UNIQUE KEY `room_number_27` (`room_number`),
  UNIQUE KEY `room_number_28` (`room_number`),
  UNIQUE KEY `room_number_29` (`room_number`),
  UNIQUE KEY `room_number_30` (`room_number`),
  UNIQUE KEY `room_number_31` (`room_number`),
  UNIQUE KEY `room_number_32` (`room_number`),
  UNIQUE KEY `room_number_33` (`room_number`),
  UNIQUE KEY `room_number_34` (`room_number`),
  UNIQUE KEY `room_number_35` (`room_number`),
  UNIQUE KEY `room_number_36` (`room_number`),
  UNIQUE KEY `room_number_37` (`room_number`),
  UNIQUE KEY `room_number_38` (`room_number`),
  UNIQUE KEY `room_number_39` (`room_number`),
  UNIQUE KEY `room_number_40` (`room_number`),
  UNIQUE KEY `room_number_41` (`room_number`),
  UNIQUE KEY `room_number_42` (`room_number`),
  UNIQUE KEY `room_number_43` (`room_number`),
  UNIQUE KEY `room_number_44` (`room_number`),
  UNIQUE KEY `room_number_45` (`room_number`),
  UNIQUE KEY `room_number_46` (`room_number`),
  UNIQUE KEY `room_number_47` (`room_number`),
  UNIQUE KEY `room_number_48` (`room_number`),
  UNIQUE KEY `room_number_49` (`room_number`),
  UNIQUE KEY `room_number_50` (`room_number`),
  UNIQUE KEY `room_number_51` (`room_number`),
  UNIQUE KEY `room_number_52` (`room_number`),
  UNIQUE KEY `room_number_53` (`room_number`),
  UNIQUE KEY `room_number_54` (`room_number`),
  UNIQUE KEY `room_number_55` (`room_number`),
  UNIQUE KEY `room_number_56` (`room_number`),
  UNIQUE KEY `room_number_57` (`room_number`),
  UNIQUE KEY `room_number_58` (`room_number`),
  UNIQUE KEY `room_number_59` (`room_number`),
  UNIQUE KEY `room_number_60` (`room_number`),
  UNIQUE KEY `room_number_61` (`room_number`),
  UNIQUE KEY `room_number_62` (`room_number`),
  KEY `room_type_id` (`room_type_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,11,'101',1,'Available','Phòng Deluxe t?ng 1','2025-09-18 07:24:35','2025-10-05 10:45:53'),(2,12,'201',2,'Occupied','Suite có b? b?i riêng t?ng 2','2025-09-18 07:24:35','2025-09-18 07:59:33'),(5,14,'301',3,'Available','','2025-09-26 15:13:44','2025-09-26 15:13:44'),(6,15,'303',3,'Available','','2025-10-02 03:38:56','2025-10-02 03:38:56');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 10:51:51
