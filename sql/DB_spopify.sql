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

DROP TABLE IF EXISTS albums;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE albums (
  album_id int unsigned NOT NULL AUTO_INCREMENT,
  artist int unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  cover_img varchar(255) DEFAULT NULL,
  released date NOT NULL,
  uploaded_at date NOT NULL,
  PRIMARY KEY (album_id),
  KEY artist (artist),
  CONSTRAINT albums_ibfk_1 FOREIGN KEY (artist) REFERENCES artists (artist_id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

/*!40000 ALTER TABLE albums DISABLE KEYS */;
INSERT INTO albums (album_id, artist, name, cover_img, released, uploaded_at) VALUES (1,1,'bopo','https://picsum.photos/618?random=1','2020-11-11','2020-11-11'),(4,2,'nark','https://picsum.photos/618?random=2','2020-11-11','2020-11-11'),(5,1,'name','https://picsum.photos/618?random=3','2020-11-11','2020-11-11'),(6,6,'pace','https://picsum.photos/618?random=6','2002-12-22','2020-09-14'),(7,7,'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?','https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce','2019-03-23','2020-09-15');
/*!40000 ALTER TABLE albums ENABLE KEYS */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS artists;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE artists (
  artist_id int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  img varchar(100) DEFAULT NULL,
  active_since date NOT NULL,
  uploaded_at date NOT NULL,
  PRIMARY KEY (artist_id)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

/*!40000 ALTER TABLE artists DISABLE KEYS */;
INSERT INTO artists (artist_id, name, img, active_since, uploaded_at) VALUES (1,'jimmy','https://picsum.photos/618?random=8','1998-08-31','2020-08-31'),(2,'kimmy','https://picsum.photos/618?random=11','1998-08-31','2020-08-31'),(3,'mimmy','https://picsum.photos/618?random=44','1998-08-31','2020-08-31'),(4,'dimmy','https://picsum.photos/618?random=54','1998-08-31','2020-08-31'),(5,'plimmy','https://picsum.photos/618?random=23','1998-08-31','2020-08-31'),(6,'ace','https://picsum.photos/618?random=55','0111-11-11','2020-09-13'),(7,'Billie Eilish','https://i.scdn.co/image/022d340319cc6c57ed953075f4c7a2d3346669af','2015-11-18','2020-09-14'),(13,'Buffy the Vampire Slayer Cast','https://i.scdn.co/image/ab67616d0000b273680b26fdf4410d3289a15727','2001-11-06','2020-09-15');
/*!40000 ALTER TABLE artists ENABLE KEYS */;

--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS interactions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE interactions (
  user_id int unsigned NOT NULL,
  song_id int unsigned NOT NULL,
  is_liked tinyint(1) NOT NULL DEFAULT '0',
  play_count int DEFAULT '0',
  created_at date DEFAULT NULL,
  PRIMARY KEY (user_id,song_id),
  KEY song_id (song_id),
  CONSTRAINT interactions_ibfk_1 FOREIGN KEY (song_id) REFERENCES songs (song_id),
  CONSTRAINT interactions_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

/*!40000 ALTER TABLE interactions DISABLE KEYS */;
INSERT INTO interactions (user_id, song_id, is_liked, play_count, created_at) VALUES (1,3,1,12,'2020-09-14'),(1,5,0,12,'2020-09-14'),(1,6,1,12,'2020-09-14'),(1,7,1,52,'2020-09-14'),(1,9,0,0,'2020-09-21'),(1,12,1,0,'2020-09-21'),(1,13,1,0,'2020-09-21'),(1,14,1,0,'2020-11-11'),(1,15,0,0,'2020-09-21'),(1,17,1,0,'2020-09-21'),(1,18,0,0,'2020-09-21'),(1,19,1,0,'2020-09-21'),(1,20,1,0,'2020-09-21'),(1,22,1,0,'2020-09-21'),(1,23,1,0,'2020-09-21'),(1,24,1,0,'2020-09-21'),(2,3,1,35,'2020-09-14'),(2,5,0,4,'2020-09-14'),(2,6,1,16,'2020-09-14'),(2,7,0,33,'2020-09-14'),(3,3,1,73,'2020-09-14'),(3,5,0,55,'2020-09-14'),(3,6,0,6,'2020-09-14'),(3,7,1,0,'2020-09-14');
/*!40000 ALTER TABLE interactions ENABLE KEYS */;

--
-- Table structure for table `playlist_interactions`
--

DROP TABLE IF EXISTS playlist_interactions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE playlist_interactions (
  user_id int unsigned NOT NULL,
  playlist_id int unsigned NOT NULL,
  is_liked tinyint(1) NOT NULL DEFAULT '0',
  play_count int DEFAULT '0',
  created_at date DEFAULT NULL,
  PRIMARY KEY (user_id,playlist_id),
  KEY playlist_id (playlist_id),
  CONSTRAINT playlist_interactions_ibfk_1 FOREIGN KEY (playlist_id) REFERENCES playlists (playlist_id),
  CONSTRAINT playlist_interactions_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_interactions`
--

/*!40000 ALTER TABLE playlist_interactions DISABLE KEYS */;
/*!40000 ALTER TABLE playlist_interactions ENABLE KEYS */;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS playlists;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE playlists (
  playlist_id int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  cover_img varchar(255) DEFAULT NULL,
  uploaded_at date NOT NULL,
  created_by int unsigned DEFAULT NULL,
  PRIMARY KEY (playlist_id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

/*!40000 ALTER TABLE playlists DISABLE KEYS */;
INSERT INTO playlists (playlist_id, name, cover_img, uploaded_at, created_by) VALUES (1,'cool List','https://picsum.photos/618?random=0','2020-09-08',1);
/*!40000 ALTER TABLE playlists ENABLE KEYS */;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS songs;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE songs (
  song_id int unsigned NOT NULL AUTO_INCREMENT,
  youtube_link varchar(255) DEFAULT NULL,
  album int unsigned DEFAULT NULL,
  artist int unsigned NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  length time NOT NULL,
  track_number int NOT NULL,
  lyrics text NOT NULL,
  released date NOT NULL,
  uploaded_at date NOT NULL,
  genres set('rock','pop','jazz','rap') DEFAULT NULL,
  PRIMARY KEY (song_id),
  KEY artist (artist),
  KEY album (album),
  CONSTRAINT songs_ibfk_1 FOREIGN KEY (artist) REFERENCES artists (artist_id),
  CONSTRAINT songs_ibfk_2 FOREIGN KEY (album) REFERENCES albums (album_id)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

/*!40000 ALTER TABLE songs DISABLE KEYS */;
INSERT INTO songs (song_id, youtube_link, album, artist, name, length, track_number, lyrics, released, uploaded_at, genres) VALUES (3,'4uLU6hMCjMI75M1A2tKUQC',4,2,'some song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock'),(5,'4uLU6hMCjMI75M1A2tKUQC',1,1,'another song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap'),(6,'4uLU6hMCjMI75M1A2tKUQC',1,1,'a different song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap'),(7,'4uLU6hMCjMI75M1A2tKUQC',1,1,'a lovely song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap'),(9,'4uLU6hMCjMI75M1A2tKUQC',4,2,'a frowny song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap'),(10,'4uLU6hMCjMI75M1A2tKUQC',5,1,'a lawny song','00:03:00',1,'somewords','2020-11-12','2020-11-12','rock,rap'),(11,'4uLU6hMCjMI75M1A2tKUQC',NULL,3,'a downy song','00:03:00',1,'somewords','2020-11-12','2020-09-13','rock,rap'),(12,'0rQtoQXQfwpDW0c7Fw1NeM',7,7,'!!!!!!!','00:00:14',1,'My Invisalign has finally...\nI have taken out my Invisalign\nI have taken out my Invisalign, and this is the album\nHahahahahahahahahahaha, ahh','2019-03-23','2020-09-15','pop'),(13,'2Fxmhks0bxGSBdJ92vM42m',7,7,'bad guy','00:03:14',2,'[Verse 1]\nWhite shirt now red, my bloody nose\nSleepin\', you\'re on your tippy toes\nCreepin\' around like no one knows\nThink you\'re so criminal\nBruises on both my knees for you\nDon\'t say thank you or please\nI do what I want when I\'m wanting to\nMy soul? So cynical\n\n[Chorus]\nSo you\'re a tough guy\nLike it really rough guy\nJust can\'t get enough guy\nChest always so puffed guy\nI\'m that bad type\nMake your mama sad type\nMake your girlfriend mad tight\nMight seduce your dad type\nI\'m the bad guy\nDuh\n\n[Post-Chorus]\nI\'m the bad guy\n\n[Verse 2]\nI like it when you take control\nEven if you know that you don\'t\nOwn me, I\'ll let you play the role\nI\'ll be your animal\nMy mommy likes to sing along with me\nBut she won\'t sing this song\nIf she reads all the lyrics\nShe\'ll pity the men I know\n\n[Chorus]\nSo you\'re a tough guy\nLike it really rough guy\nJust can\'t get enough guy\nChest always so puffed guy\nI\'m that bad type\nMake your mama sad type\nMake your girlfriend mad tight\nMight seduce your dad type\nI\'m the bad guy\nDuh\n\n[Post-Chorus]\nI\'m the bad guy, duh\nI\'m only good at bein\' bad, bad\n\n[Bridge]\nI like when you get mad\nI guess I\'m pretty glad that you\'re alone\nYou said she\'s scared of me?\nI mean, I don\'t see what she sees\nBut maybe it\'s \'cause I\'m wearing your cologne\n\n[Outro]\nI\'m a bad guy\nI\'m, I\'m a bad guy\nBad guy, bad guy\nI\'m a bad','2019-03-23','2020-09-15','pop'),(14,'4QIo4oxwzzafcBWkKjDpXY',7,7,'xanny','00:04:04',3,'[Verse 1]\nWhat is it about them?\nI must be missing something\nThey just keep doing nothing\nToo intoxicated to be scared\nBetter off without them\nThey\'re nothing but unstable\nBring ashtrays to the table\nAnd that\'s about the only thing they share\n\n[Chorus]\nI\'m in their secondhand smoke\nStill just drinking canned Coke\nI don\'t need a Xanny to feel better\nOn designated drives home\nOnly one who\'s not stoned\nDon\'t give me a Xanny, now or ever\n\n[Interlude]\nCan you check your Uber rating? Oh my god\n(And it\'s like, wait, like, when?)\n\n[Verse 2]\nWakin\' up at sundown (Ooh)\nThey\'re late to every party (Ooh)\nNobody\'s ever sorry (Ooh)\nToo inebriated now to dance\nMorning as they come down (Come down)\nTheir pretty heads are hurting (Hurting)\nThey\'re awfully bad at learning (Learning)\nMake the same mistakes, blame circumstance\n\n[Chorus]\nI\'m in their secondhand smoke\nStill just drinking canned Coke\nI don\'t need a Xanny to feel better\nOn designated drives home\nOnly one who\'s not stoned\nDon\'t give me a Xanny, now or ever\n\n[Bridge]\nPlease don\'t try to kiss me on the sidewalk\nOn your cigarette break\nI can\'t afford to love someone\nWho isn\'t dying by mistake in Silver Lake\n\n[Outro]\nWhat is it about them?\nI must be missing something\nThey just keep doin\' nothing\nToo intoxicated to be scared\nHmm, hmm\nHmm, mmm, mmm, mmm, mmm\nCome down\nHurting\nLearning','2019-03-23','2020-09-15','pop'),(15,'3XF5xLJHOQQRbWya6hBp7d',7,7,'You should see me in a crown ','00:03:01',4,'[Verse 1]\nBite my tongue, bide my time\nWearing a warning sign\nWait \'til the world is mine\nVisions I vandalize\nCold in my kingdom size\nFell for these ocean eyes\n\n[Chorus]\nYou should see me in a crown\nI\'m gonna run this nothing town\nWatch me make \'em bow\nOne by one by one\nOne by one by\nYou should see me in a crown\nYour silence is my favorite sound\nWatch me make \'em bow\nOne by one by one\nOne by one by one\n\n[Verse 2]\nCount my cards, watch them fall\nBlood on a marble wall\nI like the way they all scream\nTell me which one is worse\nLiving or dying first\nSleeping inside a hearse (I don\'t dream)\n\n[Bridge]\nYou say, \"Come over, baby\nI think you\'re pretty\"\nI\'m okay, I\'m not your baby\nIf you think I\'m pretty\n\n[Chorus]\nYou should see me in a crown\nI\'m gonna run this nothing town\nWatch me make \'em bow\nOne by one by one\nOne by one by\nYou should see me in a crown\nYour silence is my favorite sound\nWatch me make \'em bow\nOne by one by one\nOne by one by one\n\n[Instrumental Break]\n\n[Chorus]\nCrown\nI\'m gonna run this nothing town\nWatch me make \'em bow\nOne by one by one\nOne by one by\nYou should see me in a crown (You should see me, see me)\nYour silence is my favorite sound (You should see me, see me)\nWatch me make \'em bow\nOne by one by one\nOne by one by one','2019-03-23','2020-09-15','pop'),(16,'a',NULL,6,'a','01:11:01',1,'112','2002-12-22','2020-09-15',''),(17,'6IRdLKIyS4p7XNiP8r6rsx',7,7,'all the good girls go to hell','00:02:49',5,'[Intro]\nMy Lucifer is lonely\n\n[Verse 1]\nStanding there, killing time\nCan\'t commit to anything but a crime\nPeter\'s on vacation, an open invitation\nAnimals, evidence\nPearly Gates look more like a picket fence\nOnce you get inside \'em\nGot friends but can\'t invite them\n\n[Pre-Chorus]\nHills burn in California\nMy turn to ignore ya\nDon\'t say I didn\'t warn ya\n\n[Chorus]\nAll the good girls go to Hell\n\'Cause even God herself has enemies\nAnd once the water starts to rise\nAnd Heaven\'s out of sight\nShe\'ll want the Devil on her team\n\n[Post-Chorus]\nMy Lucifer is lonely\n\n[Verse 2]\nLook at you needing me\nYou know I\'m not your friend without some greenery\nWalk in wearin\' fetters\nPeter should know better\nYour cover up is caving in\nMan is such a fool, why are we saving him?\nPoisoning themselves now\nBegging for our help, wow\n\n[Pre-Chorus]\nHills burn in California\nMy turn to ignore ya\nDon\'t say I didn\'t warn ya\n\n[Chorus]\nAll the good girls go to Hell (All the good girls go to Hell)\n\'Cause even God herself (God herself) has enemies\nAnd once the water starts to rise (Water starts to rise)\nAnd Heaven\'s out of sight\nShe\'ll want the Devil on her team\n\n[Post-Chorus]\nMy Lucifer is lonely\nThere\'s nothing left to save now\nMy god is gonna owe me\nThere\'s nothing left to save now\n\n[Outro]\nHaha!\nI cannot do the snowflake','2019-03-23','2020-09-15','pop'),(18,'3Fj47GNK2kUF0uaEDgXLaD',7,7,'wish you were gay','00:03:42',6,'[Verse 1]\n\"Baby, I don\'t feel so good,\" six words you never understood\n\"I\'ll never let you go,\" five words you\'ll never say (Aww)\nI laugh along like nothing\'s wrong, four days has never felt so long\nIf three\'s a crowd and two was us, one slipped away (Hahahahahahahaha)\n\n[Chorus]\nI just wanna make you feel okay\nBut all you do is look the other way\nI can\'t tell you how much I wish I didn\'t wanna stay\nI just kinda wish you were gay\n\n[Verse 2]\nIs there a reason we\'re not through?\nIs there a 12 step just for you?\nOur conversation\'s all in blue\n11 \"heys\" (Hey, hey, hey, hey)\nTen fingers tearin\' out my hair\nNine times you never made it there\nI ate alone at 7, you were six minutes away\n(Yay)\n\n[Chorus]\nHow am I supposed to make you feel okay\nWhen all you do is walk the other way?\nI can\'t tell you how much I wish I didn\'t wanna stay\nI just kinda wish you were gay\n\n[Bridge]\nTo spare my pride\nTo give your lack of interest an explanation\nDon\'t say I\'m not your type\nJust say that I\'m not your preferred sexual orientation\nI\'m so selfish\nBut you make me feel helpless, yeah\nAnd I can\'t stand another day\nStand another day\n\n[Chorus]\nI just wanna make you feel okay\nBut all you do is look the other way, hmm\nI can\'t tell you how much I wish I didn\'t wanna stay\nI just kinda wish you were gay\nI just kinda wish you were gay\nI just kinda wish you were gay','2019-03-23','2020-09-15','pop'),(19,'43zdsphuZLzwA9k4DJhU0I',7,7,'when the party\'s over','00:03:16',7,'[Verse 1]\nDon\'t you know I\'m no good for you?\nI\'ve learned to lose you, can\'t afford to\nTore my shirt to stop you bleedin\'\nBut nothin\' ever stops you leavin\'\n\n[Chorus]\nQuiet when I\'m coming home and I\'m on my own\nI could lie, say I like it like that, like it like that\nI could lie, say I like it like that, like it like that\n\n[Verse 2]\nDon\'t you know too much already?\nI\'ll only hurt you if you let me\nCall me friend, but keep me closer (Call me back)\nAnd I\'ll call you when the party\'s over\n\n[Chorus]\nQuiet when I\'m coming home and I\'m on my own\nAnd I could lie, say I like it like that, like it like that\nYeah, I could lie, say I like it like that, like it like that\n\n[Bridge]\nBut nothin\' is better sometimes\nOnce we\'ve both said our goodbyes\nLet\'s just let it go\nLet me let you go\n\n[Chorus]\nQuiet when I\'m coming home and I\'m on my own\nI could lie, say I like it like that, like it like that\nI could lie, say I like it like that, like it like that','2019-03-23','2020-09-15','pop'),(20,'6X29iaaazwho3ab7GNue5r',7,7,'8','00:02:53',8,'[Verse 1]\nWait a minute, let me finish\nI know you don\'t care\nBut can you listen?\nI came committed, guess I overdid it\nWore my heart out on a chain\nAround my neck, but now it\'s missin\', hmm\n\n[Refrain]\nDa-da-da-da-da-da (Hmm)\nDa-da-da-da-da-da-da (Hmm, hmm, hmm, hmm)\nOh, hmm, hmm\n\n[Chorus]\nSo I think I better go\nI never really know how to please you\nYou\'re lookin\' at me like I\'m see-through\nI guess I\'m gonna go\nI just never know how you feel\nDo you even feel anything?\n\n[Refrain]\nDa-da-da-da-da-da-da\nDa-da-da-da-da-da-da\nOh, hmm, hmm\n\n[Verse 2]\nYou said, \"Don\'t treat me badly\"\nBut you said it so sadly\nSo I did the best I could\nNot thinkin\' you would have left me gladly\nI know you\'re not sorry\nWhy should you be?\n\'Cause who am I to be in love\nWhen your love never is for me?\nMe\n\n[Refrain]\nDa-da-da-da-da-da-da (Hmm)\nDa-da-da-da-da-da-da (Hmm, hmm, hmm, hmm)\nOh, hmm, hmm\n\n[Chorus]\nSo I think I better go\nI never really know how to please you\nYou\'re lookin\' at me like I\'m see-through\nI guess I\'m gonna go\nI just never know how you feel\nDo you even feel anything?','2019-03-23','2020-09-15','pop'),(22,'3Tc57t9l2O8FwQZtQOvPXK',7,7,'my strange addiction','00:03:00',9,'[Intro]\nNo, Billy, I haven\'t done that dance since my wife died\nThere’s a whole crowd of people out there who need to learn how to do The Scarn\n\n[Verse 1]\nDon\'t ask questions you don\'t wanna know\nLearned my lesson way too long ago\nTo be talkin’ to you, belladonna\nShoulda taken a break, not an Oxford comma\nTake what I want when I wanna\nAnd I want ya\n\n[Pre-Chorus]\nBad, bad news\nOne of us is gonna lose\nI\'m the powder, you\'re the fuse\nJust add some friction\n\n[Chorus]\nYou are my strange addiction\nYou are my strange addiction\nMy doctors can\'t explain\nMy symptoms or my pain\nBut you are my strange addiction\n\n[Interlude]\nI\'m really, really sorry, I think I was just relieved\nTo see that Michael Scarn got his confidence back\nYeah, Michael, the movie is amazing\nIt\'s like, one of the best movies I\'ve ever seen in my life\n\n[Verse 2]\nDeadly fever, please don\'t ever break\nBe my reliever ’cause I don’t self medicate\nAnd it burns like a gin and I like it\nPut your lips on my skin and you might ignite it\nHurts, but I know how to hide it, kinda like it (Teh)\n\n[Pre-Chorus]\nBad, bad news\nOne of us is gonna lose\nI\'m the powder, you’re the fuse\nJust add some friction\n\n[Chorus]\nYou are my strange addiction\nYou are my strange addiction\nMy doctors can\'t explain\nMy symptoms or my pain\nBut you are my strange addiction\n\n[Bridge]\nBite my glass, set myself on fire\nCan\'t you tell I\'m crass? Can’t you tell I\'m wired?\nTell me nothing lasts, like I don\'t know\nYou could kiss my— asking about my motto\n\n[Interlude]\nYou should enter it in festivals or carnivals\nThoughts? Pretty good reaction\nPretty cool... right?\n\n[Chorus]\nYou are my strange addiction\nYou are my strange addiction\nMy doctors can\'t explain\nMy symptoms or my pain\nBut you are my strange addiction\n\n[Outro]\nDid you like it? Did you like that?\nUm, which part?','2019-03-23','2020-09-15','pop'),(23,'4SSnFejRGlZikf02HLewEF',7,7,'bury a friend','00:03:13',10,'[Intro: Mehki Raine]\nBillie\n\n[Chorus: Billie Eilish]\nWhat do you want from me? Why don\'t you run from me?\nWhat are you wondering? What do you know?\nWhy aren\'t you scared of me? Why do you care for me?\nWhen we all fall asleep, where do we go?\n\n[Verse 1: Billie Eilish & Mehki Raine]\nCome here\nSay it, spit it out, what is it exactly\nYou\'re payin\'? Is the amount cleanin\' you out? Am I satisfactory?\nToday, I\'m thinkin\' about the things that are deadly\nThe way I\'m drinkin\' you down\nLike I wanna drown, like I wanna end me\n\n[Refrain: Billie Eilish]\nStep on the glass, staple your tongue (Ahh)\nBury a friend, try to wake up (Ah-ahh)\nCannibal class, killing the son (Ahh)\nBury a friend, I wanna end me\n\n[Pre-Chorus: Billie Eilish]\nI wanna end me\nI wanna, I wanna, I wanna… end me\nI wanna, I wanna, I wanna…\n\n[Chorus: Billie Eilish]\nWhat do you want from me? Why don\'t you run from me?\nWhat are you wondering? What do you know?\nWhy aren\'t you scared of me? Why do you care for me?\nWhen we all fall asleep, where do we go?\n\n[Verse 2: Billie Eilish & Mehki Raine]\nListen\nKeep you in the dark, what had you expected?\nMe to make you my art and make you a star\nAnd get you connected?\nI\'ll meet you in the park, I\'ll be calm and collected\nBut we knew right from the start that you\'d fall apart\n\'Cause I\'m too expensive\nIt\'s probably somethin\' that shouldn\'t be said out loud\nHonestly, I thought that I would be dead by now (Wow)\nCalling security, keepin\' my head held down\nBury the hatchet or bury a friend right now\n\n[Bridge: Billie Eilish & Mehki Raine]\nThe debt I owe, gotta sell my soul\n\'Cause I can\'t say no, no, I can\'t say no\nThen my limbs all froze and my eyes won\'t close\nAnd I can\'t say no, I can\'t say no\nCareful\n\n[Refrain: Billie Eilish]\nStep on the glass, staple your tongue (Ahh)\nBury a friend, try to wake up (Ah-ahh)\nCannibal class, killing the son (Ahh)\nBury a friend, I wanna end me\n\n[Pre-Chorus: Billie Eilish]\nI wanna end me\nI wanna, I wanna, I wanna… end me\nI wanna, I wanna, I wanna…\n\n[Chorus: Billie Eilish]\nWhat do you want from me? Why don\'t you run from me?\nWhat are you wondering? What do you know?\nWhy aren\'t you scared of me? Why do you care for me?\nWhen we all fall asleep, where do we go?\n\n','2019-03-23','2020-09-15','pop'),(24,'7qEKqBCD2vE5vIBsrUitpD',7,7,'ilomilo','00:02:36',11,'[Verse 1]\nTold you not to worry\nBut maybe that\'s a lie\nHoney, what\'s your hurry?\nWon\'t you stay inside?\nRemember not to get too close to stars\nThey\'re never gonna give you love like ours\n\n[Chorus]\nWhere did you go?\nI should know, but it\'s cold\nAnd I don\'t wanna be lonely\nSo show me the way home\nI can\'t lose another life\n\n[Refrain]\nHurry, I\'m worried\n\n[Verse 2]\nThe world\'s a little blurry\nOr maybe it\'s my eyes\nThe friends I\'ve had to bury\nThey keep me up at night\nSaid I couldn\'t love someone\n\'Cause I might break\nIf you\'re gonna die, not by mistake\n\n[Chorus]\nSo, where did you go?\nI should know, but it\'s cold\nAnd I don\'t wanna be lonely\nSo tell me you\'ll come home\nEven if it\'s just a lie\n\n[Bridge]\nI tried not to upset you\nLet you rescue me the day I met you\nI just wanted to protect you\nBut now I\'ll never get to\n\n[Refrain]\nHurry, I\'m worried\n\n[Outro]\nWhere did you go?\nI should know, but it\'s cold\nAnd I don\'t wanna be lonely\nWas hoping you\'d come home\nI don\'t care if it\'s a lie','2019-03-23','2020-09-15','pop'),(25,'0tMSssfxAL2oV8Vri0mFHE',7,7,'listen before i go','00:04:03',12,'[Verse 1]\nTake me to the rooftop\nI wanna see the world when I stop breathing\nTurnin\' blue\nTell me love is endless, don\'t be so pretentious\nLeave me like you do (Like you do)\n\n[Pre-Chorus]\nIf you need me, wanna see me\nBetter hurry \'cause I\'m leavin\' soon\n\n[Chorus]\nSorry can\'t save me now\nSorry I don\'t know how\nSorry there\'s no way out (Sorry)\nBut down\nHmm, down\n\n[Verse 2]\nTaste me, the salty tears on my cheek\nThat\'s what a year-long headache does to you\nI\'m not okay, I feel so scattered\nDon\'t say I\'m all that matters\nLeave me, déjà vu (Hmm)\n\n[Pre-Chorus]\nIf you need me, wanna see me\nYou better hurry, I\'m leavin\' soon\n\n[Chorus]\nSorry can\'t save me now (Sorry)\nSorry I don\'t know how (Sorry)\nSorry there\'s no way out (Sorry)\nBut down\nHmm, down\n\n[Outro]\nCall my friends and tell them that I love them\nAnd I\'ll miss them\nBut I\'m not sorry\nCall my friends and tell them that I love them\nAnd I\'ll miss them\nSorry','2019-03-23','2020-09-15','pop'),(26,'6CcJMwBtXByIz4zQLzFkKc',7,7,'i love you','00:04:52',13,'[Verse 1]\nIt\'s not true\nTell me I’ve been lied to\nCrying isn\'t like you, ooh\nWhat the hell did I do?\nNever been the type to\nLet someone see right through, ooh\n\n[Chorus]\nMaybe won\'t you take it back?\nSay you were tryna make me laugh\nAnd nothing has to change today\nYou didn’t mean to say \"I love you\"\nI love you and I don\'t want to, ooh\n\n[Verse 2]\nUp all night on another red-eye\nI wish we never learned to fly\nMaybe we should just try\nTo tell ourselves a good lie\nDidn\'t mean to make you cry\n\n[Chorus]\nMaybe won\'t you take it back?\nSay you were tryna make me laugh\nAnd nothing has to change today\nYou didn\'t mean to say \"I love you\"\nI love you and I don\'t want to, ooh\n\n[Bridge]\nThe smile that you gave me\nEven when you felt like dying\n\n[Outro]\nWe fall apart as it gets dark\nI\'m in your arms in Central Park\nThere\'s nothing you could do or say\nI can’t escape the way I love you\nI don’t want to, but I love you, ooh\nOoh, ooh\nOoh, ooh','2019-03-23','2020-09-15','pop'),(27,'3LgWsmilsrWXiPYQFRD0T7',7,7,'goodbye','00:01:59',14,'[Intro]\nPlease, please\nDon\'t leave﻿ me\nBe\n\n[Verse]\nIt\'s not true\nTake me to the rooftop\nTold you not to worry\nWhat do you want from me?\nDon\'t ask questions\nWait a minute\nDon\'t you know I\'m no good for you?\nBaby, I don\'t feel so good\nAnd all the good girls go ﻿to Hell\nBite my tongue, bide my time\nWhat is it about them?\nI\'m the bad guy','2019-03-23','2020-09-15','pop');
/*!40000 ALTER TABLE songs ENABLE KEYS */;

--
-- Table structure for table `songs_by_playlist`
--

DROP TABLE IF EXISTS songs_by_playlist;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE songs_by_playlist (
  song_id int unsigned NOT NULL,
  playlist_id int unsigned NOT NULL,
  PRIMARY KEY (song_id,playlist_id),
  KEY playlist_id (playlist_id),
  CONSTRAINT songs_by_playlist_ibfk_1 FOREIGN KEY (song_id) REFERENCES songs (song_id),
  CONSTRAINT songs_by_playlist_ibfk_2 FOREIGN KEY (playlist_id) REFERENCES playlists (playlist_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs_by_playlist`
--

/*!40000 ALTER TABLE songs_by_playlist DISABLE KEYS */;
INSERT INTO songs_by_playlist (song_id, playlist_id) VALUES (3,1),(5,1),(6,1),(9,1),(12,1);
/*!40000 ALTER TABLE songs_by_playlist ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users (
  user_id int unsigned NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  nickname varchar(20) NOT NULL,
  creation_time timestamp NOT NULL,
  is_admin tinyint(1) NOT NULL DEFAULT '0',
  preferences set('1','2','3','4') DEFAULT NULL,
  remember_token tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email),
  UNIQUE KEY username (username),
  UNIQUE KEY nickname (nickname)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE users DISABLE KEYS */;
INSERT INTO users (user_id, username, email, password, nickname, creation_time, is_admin, preferences, remember_token) VALUES (1,'alonbru','alon.bru@glibly.com','a1a1a1','AlonBru','2020-09-12 23:02:00',1,'1,2',0),(2,'gg','gg.bru@glibly.com','a1a1a1','gg','2020-09-12 23:02:00',0,'1,2',0),(3,'mg','mg.bru@glibly.com','a1a1a1','mg','2020-09-12 23:02:00',0,'1,2',0);
/*!40000 ALTER TABLE users ENABLE KEYS */;

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

-- Dump completed on 2020-09-22  0:35:39
