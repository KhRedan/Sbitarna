-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: sbitarna
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consultations`
--

DROP TABLE IF EXISTS `consultations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idMedecin` int NOT NULL,
  `idPatient` int NOT NULL,
  `dateConsultation` datetime NOT NULL,
  `tarifs` int NOT NULL,
  `status` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultations`
--

LOCK TABLES `consultations` WRITE;
/*!40000 ALTER TABLE `consultations` DISABLE KEYS */;
INSERT INTO `consultations` VALUES (1,3,7,'2020-12-28 00:00:00',50,'a'),(2,4,6,'2020-12-27 00:00:00',70,'d'),(3,9,6,'2020-12-29 00:00:00',100,'a'),(4,9,6,'2020-12-27 00:00:00',100,'d');
/*!40000 ALTER TABLE `consultations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicaments`
--

DROP TABLE IF EXISTS `medicaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reference` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicaments`
--

LOCK TABLES `medicaments` WRITE;
/*!40000 ALTER TABLE `medicaments` DISABLE KEYS */;
INSERT INTO `medicaments` VALUES (1,'3400931000679','STODAL'),(2,'8595014730132','Noventis'),(3,'123456','medicament');
/*!40000 ALTER TABLE `medicaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordonnances`
--

DROP TABLE IF EXISTS `ordonnances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordonnances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idPatient` int NOT NULL,
  `idConsultation` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordonnances`
--

LOCK TABLES `ordonnances` WRITE;
/*!40000 ALTER TABLE `ordonnances` DISABLE KEYS */;
INSERT INTO `ordonnances` VALUES (1,6,2);
/*!40000 ALTER TABLE `ordonnances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ref` varchar(50) NOT NULL,
  `quantite` int NOT NULL,
  `dateExpiration` date NOT NULL,
  `prix` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,'8595014730132',47,'2021-12-27',39.99),(2,'3400931000679',69,'2022-12-27',14.99),(3,'123456',6,'2021-03-14',20);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traitements`
--

DROP TABLE IF EXISTS `traitements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traitements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idOrdonnance` int NOT NULL,
  `refMedicament` varchar(50) NOT NULL,
  `quantite` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traitements`
--

LOCK TABLES `traitements` WRITE;
/*!40000 ALTER TABLE `traitements` DISABLE KEYS */;
INSERT INTO `traitements` VALUES (1,1,'2',3),(2,1,'1',1);
/*!40000 ALTER TABLE `traitements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `motDePasse` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `numero` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `role` varchar(1) NOT NULL DEFAULT 'p',
  `specialite` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$2b$10$KXeX/qhujIA3m5y1bOdKCOOrI0CCbgLFSnVctIsmzmHwTtRKQeNce','Admin','Sbitarna','26669603','a',NULL),(2,'pharmacien@gmail.com','$2b$10$d06CAflRCLROHV.pga.49uq624qoHvKlUq5YnmDRlFlL4wRfo6g3C','Pharmacien','Sbitarna','26','f',NULL),(3,'Generaliste@gmail.com','$2b$10$e/jcm2jXAg.Ztw0G5WZHJ.Sfm21uSnF2nQpqX7JKr5TeRuD3kDCqa','Generaliste','Sbitarna','26','d','general'),(4,'Dentiste@gmail.com','$2b$10$vEBBApnEd9I6CfqQhQLsoef05ZEbZgioTmojV.yn4Hqd2/7D2kbOW','Dentiste','Sbitarna','26','d','dentiste'),(6,'patient1@gmail.com','$2b$10$r5kXeaxMImZ6coZtDfVAjeFNyei4uYVsxPm9eeP64JKPna1BHEKka','patient1','Sbitarna','266666','p',NULL),(7,'patient2@gmail.com','$2b$10$D6gkM31Hanb0gPt3cfut..cP6tWDjfiocZt.PNRoddQLmOzdPbTIi','patient2','sbitarna','2666','p',NULL),(9,'cardio@gmail.com','$2b$10$5H7vJ/N7.H.TJa10wyxMDudEFfkxKff9kwBNhXloqUn7BNS2fwbeq','Cardio','Sbitarna','26669603','d','cardiologue');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-27  9:01:47
