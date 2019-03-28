CREATE DATABASE  IF NOT EXISTS `teamproject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `teamproject`;
-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: teamproject
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `Customer_Table`
--

DROP TABLE IF EXISTS `Customer_Table`;
/*!50001 DROP VIEW IF EXISTS `Customer_Table`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Customer_Table` AS SELECT 
 1 AS `customerID`,
 1 AS `name`,
 1 AS `email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `allergies` (
  `allergyID` varchar(250) NOT NULL,
  `allergyName` mediumtext,
  `allergyInformation` mediumtext,
  PRIMARY KEY (`allergyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES ('0','No Allergy','This food product contains no items that are common allergens.'),('1','Egg','Warning: This food product contains egg.'),('2','Fish','Warning: This food product contains fish.'),('3','Garlic','Warning: This food product contains garlic.'),('4','Peanut','Warning: This food product contains peanuts.'),('5','Rice','Warning: This food product contains rice.'),('6','Milk','Warning: This food product contains milk.'),('7','Soy','Warning: This food product contains soy.'),('8','Nuts','Warning: This food product contains nuts.');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credsAPI`
--

DROP TABLE IF EXISTS `credsAPI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credsAPI` (
  `token` varchar(250) NOT NULL,
  `secret` varchar(250) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credsAPI`
--

LOCK TABLES `credsAPI` WRITE;
/*!40000 ALTER TABLE `credsAPI` DISABLE KEYS */;
INSERT INTO `credsAPI` VALUES ('abc123','def456',0);
/*!40000 ALTER TABLE `credsAPI` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customerID` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID_UNIQUE` (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemAllergies`
--

DROP TABLE IF EXISTS `itemAllergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemAllergies` (
  `allergyID` varchar(250) NOT NULL,
  `itemAllergyEntry` varchar(250) NOT NULL,
  `itemID` varchar(250) NOT NULL,
  PRIMARY KEY (`itemAllergyEntry`),
  KEY `fk_itemAllergies_1_idx` (`itemID`),
  KEY `fk_itemAllergies_2_idx` (`allergyID`),
  CONSTRAINT `fk_itemAllergies_1` FOREIGN KEY (`allergyID`) REFERENCES `allergies` (`allergyID`),
  CONSTRAINT `fk_itemAllergies_2` FOREIGN KEY (`itemID`) REFERENCES `menuItems` (`itemID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemAllergies`
--

LOCK TABLES `itemAllergies` WRITE;
/*!40000 ALTER TABLE `itemAllergies` DISABLE KEYS */;
INSERT INTO `itemAllergies` VALUES ('1','1','1'),('2','2','1'),('0','3','2'),('0','4','3'),('0','5','4'),('0','6','5'),('0','7','6'),('0','8','7'),('8','9','8');
/*!40000 ALTER TABLE `itemAllergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuItems`
--

DROP TABLE IF EXISTS `menuItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menuItems` (
  `itemID` varchar(250) NOT NULL,
  `itemName` mediumtext,
  `itemCalories` float DEFAULT NULL,
  `itemPrice` float DEFAULT NULL,
  `itemType` mediumtext,
  `itemInformation` longtext,
  `itemImage` longtext,
  `itemEnabled` int(11) NOT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuItems`
--

LOCK TABLES `menuItems` WRITE;
/*!40000 ALTER TABLE `menuItems` DISABLE KEYS */;
INSERT INTO `menuItems` VALUES ('1','RandomDish',1,11.01,'Main','a random dish','https://i.kym-cdn.com/entries/icons/mobile/000/013/564/doge.jpg',1),('2','Birria',100,21,'Starter','Birria is a Mexican dish from the state of Jalisco. The dish is a spicy stew, traditionally made from goat meat or mutton, but occasionally from beef or chicken.','https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Plato_de_birria.jpg/250px-Plato_de_birria.jpg',0),('3','Coca Cola',100,2,'Drink','Fizzy Drink','https://upload.wikimedia.org/wikipedia/commons/8/87/CocaColaBottle_background_free.jpg',0),('4','Pepsi',500,3,'Drink','Fizzy Drink','https://content.etilize.com/Original/1029886380.jpg',1),('5','Caldo de pollo ',300,10,'Starter','Caldo de pollo is a common Latin American soup that consists of chicken and vegetables. ','https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Caldo_de_Pollo_%282411932823%29.jpg/220px-Caldo_de_Pollo_%282411932823%29.jpg',1),('6','Caldo de siete mares',300,23,'Starter','Caldo de siete mares (in English, \"seven seas soup\"), also known as caldo de mariscos (\"seafood soup\") is a Mexican version of fish stew, popular in coastal regions in Mexico. It is typically made with chicken, tomato, fish, or seafood broth with local fresh seafood ingredients and, like other Mexican soups, cooked quickly in a thin broth.','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Caldo_de_mariscos.jpg/250px-Caldo_de_mariscos.jpg',1),('7','Huevos a la mexicana',200,15,'Main','Huevos a la mexicana is a popular breakfast dish in Mexican cuisine. Finely chopped tomato, green chili pepper and onion is lightly fried in a hot skillet. Eggs are added and stirred until set. The heat is turned off and the coriander leaves are mixed in the eggs, adding salt.','https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Huevos_%C3%A0_la_Mexicana._%286571912625%29.jpg/220px-Huevos_%C3%A0_la_Mexicana._%286571912625%29.jpg',1),('8','Bionico',100,12,'Dessert','Bionico is a popular Mexican dessert that originated in the city of Guadalajara in Jalisco, Mexico, in the early 1990s. It is essentially a fruit salad consisting of a variety of fruits chopped up into small cubes, drenched with crema and topped off with granola, shredded coconut, raisins and sometimes honey. Any kind of fruit can be used, but it is most commonly made with papaya, cantaloupe, honeydew, strawberries, apples and banana. ','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bionico_Close_Up.jpg/250px-Bionico_Close_Up.jpg',1);
/*!40000 ALTER TABLE `menuItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` varchar(250) NOT NULL,
  `table` int(11) NOT NULL,
  `inserted` float NOT NULL,
  `retrieved` float DEFAULT NULL,
  `type` text NOT NULL,
  `meta` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderHistory`
--

DROP TABLE IF EXISTS `orderHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderHistory` (
  `insertionID` varchar(255) NOT NULL,
  `orderID` varchar(255) NOT NULL,
  `stage` varchar(45) NOT NULL,
  `inserted` int(11) NOT NULL,
  `metafield` text,
  PRIMARY KEY (`insertionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderHistory`
--

LOCK TABLES `orderHistory` WRITE;
/*!40000 ALTER TABLE `orderHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderItems` (
  `insertionID` varchar(255) NOT NULL,
  `orderID` varchar(255) NOT NULL,
  `itemID` varchar(255) NOT NULL,
  PRIMARY KEY (`insertionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `customerID` varchar(255) NOT NULL,
  `orderID` varchar(255) NOT NULL,
  `timeCreated` int(11) NOT NULL,
  `table` int(11) NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `orderID` (`orderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userAccess`
--

DROP TABLE IF EXISTS `userAccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userAccess` (
  `id` varchar(250) NOT NULL,
  `token` varchar(250) NOT NULL,
  `time` text NOT NULL,
  `uid` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_userAccess_1_idx` (`uid`),
  KEY `fk_userAccess_2_idx` (`token`),
  CONSTRAINT `fk_userAccess_1` FOREIGN KEY (`uid`) REFERENCES `users` (`userID`),
  CONSTRAINT `fk_userAccess_2` FOREIGN KEY (`token`) REFERENCES `credsAPI` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userAccess`
--

LOCK TABLES `userAccess` WRITE;
/*!40000 ALTER TABLE `userAccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `userAccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` varchar(250) NOT NULL,
  `userUsername` varchar(250) NOT NULL,
  `userPassword` varchar(250) NOT NULL,
  `userPrivilegeLevel` int(11) NOT NULL,
  `userEmail` mediumtext,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username_UNIQUE` (`userUsername`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2098sdfkh','manager','$argon2id$v=19$m=102400,t=2,p=8$KCeURZHXn443eVvdUHQgzQ$4Q3ksdTF61VZA932CyHDVA',-1,NULL),('aaaa123','WillKitchen','$argon2id$v=19$m=102400,t=2,p=8$DPx/dMAdn8XKHD+vxJY8/g$NKZAq8SC15Y64G4XU5w4hw',1,NULL),('asdasd123123','test','$argon2id$v=19$m=102400,t=2,p=8$KCeURZHXn443eVvdUHQgzQ$4Q3ksdTF61VZA932CyHDVA',0,NULL),('asdsa389','harisKitchen','$argon2id$v=19$m=102400,t=2,p=8$KCeURZHXn443eVvdUHQgzQ$4Q3ksdTF61VZA932CyHDVA',1,NULL),('bbb123','WillStaff','$argon2id$v=19$m=102400,t=2,p=8$DPx/dMAdn8XKHD+vxJY8/g$NKZAq8SC15Y64G4XU5w4hw',0,NULL),('ljklkjlkj9890','harisWaiter','$argon2id$v=19$m=102400,t=2,p=8$KCeURZHXn443eVvdUHQgzQ$4Q3ksdTF61VZA932CyHDVA',0,NULL),('sakjahkjh23989','kitchen','$argon2id$v=19$m=102400,t=2,p=8$KCeURZHXn443eVvdUHQgzQ$4Q3ksdTF61VZA932CyHDVA',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `Customer_Table`
--

/*!50001 DROP VIEW IF EXISTS `Customer_Table`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`teamproject`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Customer_Table` AS select `orders`.`customerID` AS `customerID`,`customers`.`name` AS `name`,`customers`.`email` AS `email` from (`orders` join `customers` on((`orders`.`customerID` = `customers`.`customerID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-28  0:23:39
