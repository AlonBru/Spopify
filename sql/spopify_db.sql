CREATE DATABASE  IF NOT EXISTS `spopify` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spopify`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: spopify
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `album_id` int unsigned NOT NULL AUTO_INCREMENT,
  `artist` int unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `cover_img` varchar(255) DEFAULT NULL,
  `released` date NOT NULL,
  `uploaded_at` date NOT NULL,
  `likes_number` int DEFAULT '0',
  PRIMARY KEY (`album_id`),
  KEY `artist` (`artist`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist`) REFERENCES `artists` (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--


/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,1,'bopo','cover_img','2020-11-11','2020-11-11',12),(4,2,'nark','cover_img','2020-11-11','2020-11-11',12),(5,1,'name','cover_img','2020-11-11','2020-11-11',12),(6,6,'pace',NULL,'2002-12-22','2020-09-14',0),(7,7,'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?','https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce','2019-03-23','2020-09-15',0);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;


--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `artist_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `active_since` date NOT NULL,
  `uploaded_at` date NOT NULL,
  `likes_number` int DEFAULT '0',
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--


/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'jimmy',NULL,'1998-08-31','2020-08-31',0),(2,'kimmy',NULL,'1998-08-31','2020-08-31',0),(3,'mimmy',NULL,'1998-08-31','2020-08-31',0),(4,'dimmy',NULL,'1998-08-31','2020-08-31',0),(5,'plimmy',NULL,'1998-08-31','2020-08-31',0),(6,'ace',NULL,'0111-11-11','2020-09-13',0),(7,'Billie Eilish','https://i.scdn.co/image/022d340319cc6c57ed953075f4c7a2d3346669af','2015-11-18','2020-09-14',0),(13,'Buffy the Vampire Slayer Cast','https://i.scdn.co/image/ab67616d0000b273680b26fdf4410d3289a15727','2001-11-06','2020-09-15',0),(14,'a',NULL,'0011-11-11','2020-09-15',0);
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;


--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS `interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interactions` (
  `user_id` int unsigned NOT NULL,
  `song_id` int unsigned NOT NULL,
  `is_liked` tinyint(1) NOT NULL DEFAULT '0',
  `play_count` int DEFAULT '0',
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`user_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `interactions_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`),
  CONSTRAINT `interactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--


/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
INSERT INTO `interactions` VALUES (1,3,1,12,'2020-09-14'),(1,5,0,12,'2020-09-14'),(1,6,1,12,'2020-09-14'),(1,7,1,52,'2020-09-14'),(2,3,1,35,'2020-09-14'),(2,5,0,4,'2020-09-14'),(2,6,1,16,'2020-09-14'),(2,7,1,33,'2020-09-14'),(3,3,1,73,'2020-09-14'),(3,5,0,55,'2020-09-14'),(3,6,0,6,'2020-09-14'),(3,7,1,0,'2020-09-14');
/*!40000 ALTER TABLE `interactions` ENABLE KEYS */;


--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `playlist_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `cover_img` varchar(255) DEFAULT NULL,
  `uploaded_at` date NOT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `likes_number` int DEFAULT '0',
  PRIMARY KEY (`playlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--


/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;


--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `song_id` int unsigned NOT NULL AUTO_INCREMENT,
  `youtube_link` varchar(255) DEFAULT NULL,
  `album` int unsigned DEFAULT NULL,
  `artist` int unsigned NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `length` time NOT NULL,
  `track_number` int NOT NULL,
  `lyrics` text NOT NULL,
  `released` date NOT NULL,
  `uploaded_at` date NOT NULL,
  `genres` set('rock','pop','jazz','rap') DEFAULT NULL,
  `likes_number` int DEFAULT '0',
  PRIMARY KEY (`song_id`),
  KEY `artist` (`artist`),
  KEY `album` (`album`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artist`) REFERENCES `artists` (`artist_id`),
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`album`) REFERENCES `albums` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--


/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (3,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',4,2,'some song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock',13),(5,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',1,1,'another song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap',13),(6,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',1,1,'a different song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap',13),(7,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',1,1,'a lovely song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap',13),(9,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',4,2,'a frowny song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap',13),(10,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',5,1,'a lawny song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap',13),(11,'https://www.youtube.com/watch?v=oHg5SJYRHA0&ab_channel=cotter548',NULL,3,'a downy song','00:03:00',1,'somewords','2020-11-12','2020-09-13','rock,rap',13);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;


--
-- Table structure for table `songs_by_playlist`
--

DROP TABLE IF EXISTS `songs_by_playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs_by_playlist` (
  `song_id` int unsigned NOT NULL,
  `playlist_id` int unsigned NOT NULL,
  PRIMARY KEY (`song_id`,`playlist_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `songs_by_playlist_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`),
  CONSTRAINT `songs_by_playlist_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs_by_playlist`
--


/*!40000 ALTER TABLE `songs_by_playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `songs_by_playlist` ENABLE KEYS */;


--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `creation_time` timestamp NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `preferences` set('1','2','3','4') DEFAULT NULL,
  `remember_token` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--


/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alonbru','alon.bru@glibly.com','a1a1a1','AlonBru','2020-09-12 23:02:00',1,'1,2',0),(2,'gg','gg.bru@glibly.com','a1a1a1','gg','2020-09-12 23:02:00',0,'1,2',0),(3,'mg','mg.bru@glibly.com','a1a1a1','mg','2020-09-12 23:02:00',0,'1,2',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


--
-- Dumping events for database 'spopify'
--

--
-- Dumping routines for database 'spopify'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-15  2:43:30

