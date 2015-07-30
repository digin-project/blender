-- phpMyAdmin SQL Dump
-- version 4.2.5
-- http://www.phpmyadmin.net
--
-- Client :  localhost:8889
-- Généré le :  Mar 28 Juillet 2015 à 16:16
-- Version du serveur :  5.5.38
-- Version de PHP :  5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `gestionnaire`
--

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE `projects` (
`id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `deadline` date NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `projects`
--

INSERT INTO `projects` (`id`, `name`, `deadline`) VALUES
(1, 'pharmasep', '2015-06-30'),
(2, 'digin', '0000-00-00'),
(3, 'bullshit', '0000-00-00'),
(4, 'Courgettes', '0000-00-00'),
(5, 'Pamplemousse', '0000-00-00'),
(6, 'Raviolis', '0000-00-00'),
(7, 'Crémoulade', '0000-00-00'),
(8, 'Projet postman', '0000-00-00'),
(9, 'test angular', '0000-00-00'),
(10, 'test yoyo', '0000-00-00'),
(11, 'test mdrrrr', '0000-00-00'),
(12, 'hamdoulah', '2015-07-17');

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
`id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `importance` int(11) NOT NULL,
  `days` int(11) NOT NULL,
  `finish` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=123 ;

--
-- Contenu de la table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `content`, `created`, `importance`, `days`, `finish`) VALUES
(116, 'Première tâche', 'voilà', '2015-07-22 12:38:58', 2, 0, 1),
(117, 'Première tâche', 'voilà', '2015-07-22 12:38:58', 2, 0, 0),
(118, 'Première tâche', 'voilà', '2015-07-22 12:38:58', 2, 0, 0),
(119, '', '', '2015-07-28 09:01:09', 0, 0, 0),
(120, 'testbool', 'testbool', '2015-07-29 22:00:00', 0, 0, 0),
(121, 'testbool', 'testbool', '2015-07-28 09:01:56', 2, 3, 1),
(122, 'testbool', 'testbool', '2015-07-28 09:02:03', 2, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `tasks_project`
--

CREATE TABLE `tasks_project` (
`id_task` int(11) NOT NULL,
  `id_project` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=123 ;

--
-- Contenu de la table `tasks_project`
--

INSERT INTO `tasks_project` (`id_task`, `id_project`) VALUES
(112, 1),
(122, 2);

-- --------------------------------------------------------

--
-- Structure de la table `tasks_task`
--

CREATE TABLE `tasks_task` (
  `id_task_mere` int(11) NOT NULL,
  `id_task_fille` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `tasks_task`
--

INSERT INTO `tasks_task` (`id_task_mere`, `id_task_fille`) VALUES
(121, 122);

-- --------------------------------------------------------

--
-- Structure de la table `tasks_user`
--

CREATE TABLE `tasks_user` (
  `id_user` int(11) NOT NULL,
  `id_task` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `tasks_user`
--

INSERT INTO `tasks_user` (`id_user`, `id_task`) VALUES
(1, 112),
(1, 113),
(1, 116),
(1, 117),
(1, 118),
(1, 122);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
`id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `name`, `firstname`, `mail`, `password`, `token`) VALUES
(1, 'Brethes', 'Pierre', 'pi.brethes@gmail.com', 'Yo2000', '92fb55c30797bba9c0273d0ef507ee09853a44b8f2476c9'),
(2, 'Ardilouze', 'Amandine', 'amandine.ardilouze@gmail.com', 'Pierre0605', 'f94ea2e0a5453263f03bb419359a61413a41f6fecb171ee'),
(3, 'Cadiou', 'Louis', 'louis.cadiou@gmail.com', 'Yo2000', ''),
(6, 'Mouloud', 'mamouloud', 'mouloud@yo.com', 'Yo2000', ''),
(7, 'Digin', 'Lucas', 'lucas.digin@gmail.com', 'Yo2000', '');

-- --------------------------------------------------------

--
-- Structure de la table `users_project`
--

CREATE TABLE `users_project` (
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
`id_up` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `users_project`
--

INSERT INTO `users_project` (`id_user`, `id_project`, `id_up`) VALUES
(1, 1, 1),
(2, 1, 2),
(1, 2, 3),
(3, 3, 4),
(1, 5, 5),
(1, 6, 6),
(1, 7, 7);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `projects`
--
ALTER TABLE `projects`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tasks_project`
--
ALTER TABLE `tasks_project`
 ADD PRIMARY KEY (`id_task`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users_project`
--
ALTER TABLE `users_project`
 ADD PRIMARY KEY (`id_up`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `projects`
--
ALTER TABLE `projects`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=123;
--
-- AUTO_INCREMENT pour la table `tasks_project`
--
ALTER TABLE `tasks_project`
MODIFY `id_task` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=123;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `users_project`
--
ALTER TABLE `users_project`
MODIFY `id_up` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
