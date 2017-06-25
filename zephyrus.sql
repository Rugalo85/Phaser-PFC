-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2017 a las 01:27:11
-- Versión del servidor: 10.1.22-MariaDB
-- Versión de PHP: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zephyrus`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configs`
--

CREATE TABLE `configs` (
  `id` int(11) NOT NULL,
  `userName` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `configName` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `player01Name` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `player01Speed` int(3) NOT NULL,
  `player01Lives` int(3) NOT NULL,
  `player01Skin` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `player01Bullets` int(1) NOT NULL,
  `gainplayer01Lives` int(11) NOT NULL,
  `player02Name` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `player02Speed` int(3) NOT NULL,
  `player02Lives` int(3) NOT NULL,
  `player02Skin` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `player02Bullets` int(1) NOT NULL,
  `gainplayer02Lives` int(11) NOT NULL,
  `enemy01Spacing` int(11) NOT NULL,
  `enemy01Speed` int(11) NOT NULL,
  `enemy02Spacing` int(11) NOT NULL,
  `enemy02Speed` int(11) NOT NULL,
  `enemy02BulletSpeed` int(11) NOT NULL,
  `enemy02FiringDelay` int(11) NOT NULL,
  `enemy03Spacing` int(11) NOT NULL,
  `enemy03Speed` int(11) NOT NULL,
  `numEnemies03InWave` int(11) NOT NULL,
  `enemy04Spacing` int(11) NOT NULL,
  `enemy04Speed` int(11) NOT NULL,
  `enemiesToDefeat` int(11) NOT NULL,
  `boss01Shields` int(11) NOT NULL,
  `boss01Speed` int(11) NOT NULL,
  `boss01BulletSpeed01` int(11) NOT NULL,
  `boss01BulletSpeed02` int(11) NOT NULL,
  `boss01BulletSpeed03` int(11) NOT NULL,
  `boss01FiringDelay01` int(11) NOT NULL,
  `boss01FiringDelay02` int(11) NOT NULL,
  `boss01FiringDelay03` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `playerName` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `playerScore` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `scores`
--

INSERT INTO `scores` (`id`, `playerName`, `playerScore`) VALUES
(4, 'Sarevok', '2500'),
(5, 'Arthas', '2200'),
(6, 'Sephiroth', '2000'),
(7, 'Ocelot', '1800'),
(8, 'Robotnik', '1600'),
(9, 'Bowser', '1400'),
(10, 'Kerrigan', '1200'),
(11, 'Arthorias', '1000'),
(12, 'Ganondorf', '800'),
(13, 'Diablo', '600'),
(42, 'Saitama', '4900'),
(43, 'asdasd', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Ruben', 'ruben@ruben.es', '$2y$10$x.A1BR7z80xmjfLza3zHbes514itriWg8dBUaIfk8qsin3p3UXVua');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
