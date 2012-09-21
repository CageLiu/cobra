-- phpMyAdmin SQL Dump
-- version 3.3.10deb1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2012 年 08 月 21 日 10:11
-- 服务器版本: 5.1.63
-- PHP 版本: 5.3.5-1ubuntu7.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `cobra`
--

-- --------------------------------------------------------

--
-- 表的结构 `django_session`
--

CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_3da3d3d8` (`expire_date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('378cbe50a01bd1810ff0f47eba2196ca', 'MTdhNGU0MjA3ODBiODlmYmIzYTY3MDE2MjAwMzcwZTQ3MzQ4Y2VkNjqAAn1xAShVC2N1cnJlbnRw\nYWdlWCcAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9kZW1vLmh0bWxxAlUPX3Nlc3Np\nb25fZXhwaXJ5SwBVA3VpZIoBAVVkTW96aWxsYS81LjAgKFgxMTsgTGludXggaTY4NikgQXBwbGVX\nZWJLaXQvNTM3LjEgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMjEuMC4xMTgwLjc1IFNhZmFy\naS81MzcuMX1xA2gCSlqpJVBzVQptb2RpZnlUaW1lfXEEWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cv\nYmFzZS9mZWtpdC9SRUFETUUuaHRtbEp0OCVQc3Uu\n', '2012-08-25 08:59:13'),
('c7199b6166c551ac9f1ee56ad6035b39', 'ZTIyN2E1NmVmZTU2ZjI3ZWZlY2RkMWYxMmViMzYyM2M5MzQwYzYyNjqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbFVbTW96aWxs\nYS80LjAgKGNvbXBhdGlibGU7IE1TSUUgNy4wOyBXaW5kb3dzIE5UIDUuMTsgU1YxOyBRUURvd25s\nb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xAlgpAAAAL3Zhci93d3cvY29icmEvd3d3L2Jh\nc2UvZmVraXQvUkVBRE1FLmh0bWxKdDglUHNVCm1vZGlmeVRpbWV9cQNYKQAAAC92YXIvd3d3L2Nv\nYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1sSnQ4JVBzVWhNb3ppbGxhLzQuMCAoY29tcGF0\naWJsZTsgTVNJRSA4LjA7IFdpbmRvd3MgTlQgNS4xOyBUcmlkZW50LzQuMDsgU1YxOyBRUURvd25s\nb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xBFgpAAAAL3Zhci93d3cvY29icmEvd3d3L2Jh\nc2UvZmVraXQvUkVBRE1FLmh0bWxKHjwlUHNVW01vemlsbGEvNC4wIChjb21wYXRpYmxlOyBNU0lF\nIDYuMDsgV2luZG93cyBOVCA1LjE7IFNWMTsgUVFEb3dubG9hZCA3MDg7IC5ORVQgQ0xSIDIuMC41\nMDcyNyl9cQVYKQAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1sSh48\nJVBzdS4=\n', '2012-08-25 00:51:44'),
('572d554078c55c461332496fd42a132f', 'ZTgyYjlhNDQ3MzVhMzBiZTZkOTMwYmRmYjBkNTdjNDA1YTY0OWVlMzqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbHECVWhNb3pp\nbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA4LjA7IFdpbmRvd3MgTlQgNS4xOyBUcmlkZW50LzQu\nMDsgU1YxOyBRUURvd25sb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xA2gCSh48JVBzVVtN\nb3ppbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA2LjA7IFdpbmRvd3MgTlQgNS4xOyBTVjE7IFFR\nRG93bmxvYWQgNzA4OyAuTkVUIENMUiAyLjAuNTA3MjcpcQR9cQVYKQAAAC92YXIvd3d3L2NvYnJh\nL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1sSh48JVBzdS4=\n', '2012-08-25 00:56:29'),
('40aaeb38fa041e1aa046c098223cd3b6', 'ZTgyYjlhNDQ3MzVhMzBiZTZkOTMwYmRmYjBkNTdjNDA1YTY0OWVlMzqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbHECVWhNb3pp\nbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA4LjA7IFdpbmRvd3MgTlQgNS4xOyBUcmlkZW50LzQu\nMDsgU1YxOyBRUURvd25sb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xA2gCSh48JVBzVVtN\nb3ppbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA2LjA7IFdpbmRvd3MgTlQgNS4xOyBTVjE7IFFR\nRG93bmxvYWQgNzA4OyAuTkVUIENMUiAyLjAuNTA3MjcpcQR9cQVYKQAAAC92YXIvd3d3L2NvYnJh\nL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1sSh48JVBzdS4=\n', '2012-08-25 01:27:51'),
('be85e792c0c589068b068322f597c148', 'NWM4M2JiN2ZmNGZiYWNjOTE0NmVjOTE1ZjY2OWJhZjgxZmVkMWM1NjqAAn1xAShVC2N1cnJlbnRw\nYWdlcQJYKQAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1scQNVW01v\nemlsbGEvNC4wIChjb21wYXRpYmxlOyBNU0lFIDYuMDsgV2luZG93cyBOVCA1LjE7IFNWMTsgUVFE\nb3dubG9hZCA3MDg7IC5ORVQgQ0xSIDIuMC41MDcyNylxBH1xBWgDSh48JVBzdS4=\n', '2012-08-25 01:27:50'),
('30bfdfe41c19e15f0f777c7fb2cb31bc', 'ZWU5Mjg5OGI5ZTdhMzEzOTc1ZmZhNjNmZTkzNjlhYzBiNDZiOTBlMTqAAn1xAShVC2N1cnJlbnRw\nYWdlcQJYKQAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1scQNVaE1v\nemlsbGEvNC4wIChjb21wYXRpYmxlOyBNU0lFIDguMDsgV2luZG93cyBOVCA1LjE7IFRyaWRlbnQv\nNC4wOyBTVjE7IFFRRG93bmxvYWQgNzA4OyAuTkVUIENMUiAyLjAuNTA3MjcpcQR9cQVoA0oePCVQ\nc3Uu\n', '2012-08-25 01:28:17'),
('018e94e50434aafe0b2cddfc441ba0d7', 'MDQxNWJkYzAyNTMyZWFmN2NmNTNjN2MwMWVjM2MxYzM3YzAxYWRjNDqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbHECVWhNb3pp\nbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA4LjA7IFdpbmRvd3MgTlQgNS4xOyBUcmlkZW50LzQu\nMDsgU1YxOyBRUURvd25sb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KXEDfXEEWCkAAAAvdmFy\nL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbEoePCVQc1VbTW96aWxsYS80LjAg\nKGNvbXBhdGlibGU7IE1TSUUgNi4wOyBXaW5kb3dzIE5UIDUuMTsgU1YxOyBRUURvd25sb2FkIDcw\nODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xBWgCSh48JVBzdS4=\n', '2012-08-25 01:28:18'),
('11a3205a4aef11e228fdd47f414069ea', 'NWM4M2JiN2ZmNGZiYWNjOTE0NmVjOTE1ZjY2OWJhZjgxZmVkMWM1NjqAAn1xAShVC2N1cnJlbnRw\nYWdlcQJYKQAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1scQNVW01v\nemlsbGEvNC4wIChjb21wYXRpYmxlOyBNU0lFIDYuMDsgV2luZG93cyBOVCA1LjE7IFNWMTsgUVFE\nb3dubG9hZCA3MDg7IC5ORVQgQ0xSIDIuMC41MDcyNylxBH1xBWgDSh48JVBzdS4=\n', '2012-08-25 01:28:23'),
('fed046d7f8cc02de1052920ce8ffc26e', 'ZTgyYjlhNDQ3MzVhMzBiZTZkOTMwYmRmYjBkNTdjNDA1YTY0OWVlMzqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbHECVWhNb3pp\nbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA4LjA7IFdpbmRvd3MgTlQgNS4xOyBUcmlkZW50LzQu\nMDsgU1YxOyBRUURvd25sb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xA2gCSh48JVBzVVtN\nb3ppbGxhLzQuMCAoY29tcGF0aWJsZTsgTVNJRSA2LjA7IFdpbmRvd3MgTlQgNS4xOyBTVjE7IFFR\nRG93bmxvYWQgNzA4OyAuTkVUIENMUiAyLjAuNTA3MjcpcQR9cQVYKQAAAC92YXIvd3d3L2NvYnJh\nL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1sSh48JVBzdS4=\n', '2012-08-25 01:28:25'),
('e444cc5c56a34894ea52b71de3f3b0d3', 'OTY0MGNjNGViM2U1MDJhNWM2OTlhODM2Y2M0MzY3ZWJhZTM4MmNkZjqAAn1xAShVaE1vemlsbGEv\nNC4wIChjb21wYXRpYmxlOyBNU0lFIDguMDsgV2luZG93cyBOVCA1LjE7IFRyaWRlbnQvNC4wOyBT\nVjE7IFFRRG93bmxvYWQgNzA4OyAuTkVUIENMUiAyLjAuNTA3MjcpfXECKFgtAAAAL3Zhci93d3cv\nY29icmEvc3RhdGljL3AyL2Nzcy9pbm5lcmNzcy9hYmMuY3NzSouCI1BYIQAAAC92YXIvd3d3L2Nv\nYnJhL3d3dy9wMi9oZWFkZXIuaHRtbEpR3iRQWCAAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvaW5k\nZXguaHRtbEpFxCRQWCYAAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL3N0eWxlLmNzc0qK\nxCRQWB4AAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvYWJjLmh0bWxKCN4kUFghAAAAL3Zhci93d3cv\nY29icmEvd3d3L3AyL2Zvb3Rlci5odG1sSgrVH1B1VQN1aWSKAQFVW01vemlsbGEvNC4wIChjb21w\nYXRpYmxlOyBNU0lFIDYuMDsgV2luZG93cyBOVCA1LjE7IFNWMTsgUVFEb3dubG9hZCA3MDg7IC5O\nRVQgQ0xSIDIuMC41MDcyNyl9cQMoWC0AAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL2lu\nbmVyY3NzL2FiYy5jc3NKi4IjUFg2AAAAL3Zhci93d3cvY29icmEvd3d3L3AyL3Bpbm5lci9hYmMv\nZWZnL2hqay9vcHQvdGVzdC5odG1scQRKspQnUFghAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL2hl\nYWRlci5odG1sSlHeJFBYJgAAAC92YXIvd3d3L2NvYnJhL3N0YXRpYy9wMi9jc3Mvc3R5bGUuY3Nz\nSorEJFBYHgAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9hYmMuaHRtbEoI3iRQWCEAAAAvdmFyL3d3\ndy9jb2JyYS93d3cvcDIvZm9vdGVyLmh0bWxKCtUfUFgeAAAAL3Zhci93d3cvY29icmEvd3d3L3Ay\nL19sMS5odG1sSjSDI1B1VQ9fc2Vzc2lvbl9leHBpcnlLAFULY3VycmVudHBhZ2VoBFVbTW96aWxs\nYS80LjAgKGNvbXBhdGlibGU7IE1TSUUgNy4wOyBXaW5kb3dzIE5UIDUuMTsgU1YxOyBRUURvd25s\nb2FkIDcwODsgLk5FVCBDTFIgMi4wLjUwNzI3KX1xBShYLQAAAC92YXIvd3d3L2NvYnJhL3N0YXRp\nYy9wMi9jc3MvaW5uZXJjc3MvYWJjLmNzc0qLgiNQWCEAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIv\naGVhZGVyLmh0bWxKUd4kUFggAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL2luZGV4Lmh0bWxKRcQk\nUFgmAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3AyL2Nzcy9zdHlsZS5jc3NKisQkUFgeAAAAL3Zh\nci93d3cvY29icmEvd3d3L3AyL2FiYy5odG1sSgjeJFBYIQAAAC92YXIvd3d3L2NvYnJhL3d3dy9w\nMi9mb290ZXIuaHRtbEoK1R9QdXUu\n', '2012-08-26 19:35:41'),
('98958e0e970143eea50ef1497333813b', 'OWJhNjkwZDMxNTEwYmUwNjYyMDJlZDQ3NGI5M2IwNmFjM2MwMjY2NTqAAn1xAShVC2N1cnJlbnRw\nYWdlWCMAAAAvdmFyL3d3dy9jb2JyYS93d3cvdGVzdC95X2dfMTAuaHRtbHECVUxNb3ppbGxhLzUu\nMCAoWDExOyBVYnVudHU7IExpbnV4IGk2ODY7IHJ2OjE0LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVm\nb3gvMTQuMC4xfXEDKFglAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3Rlc3QvanMvdGVzdC5qc0p2\n4Q9QWCgAAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvdGVzdC9jc3MvbGVzcy5sZXNzShN5F1BYIwAA\nAC92YXIvd3d3L2NvYnJhL3d3dy90ZXN0L2hlYWRlci5odG1sSrO0H1BoAkowg6hPWCgAAAAvdmFy\nL3d3dy9jb2JyYS9zdGF0aWMvdGVzdC9jc3Mvc3R5bGUuY3NzSoqpJFBYIwAAAC92YXIvd3d3L2Nv\nYnJhL3d3dy90ZXN0L2Zvb3Rlci5odG1sSn5aD1B1VQN1aWSKAQFVD19zZXNzaW9uX2V4cGlyeUsA\ndS4=\n', '2012-08-26 13:40:27'),
('011ee3cf48da78bafaf2f5b623465114', 'ZTczNGEwODI4ODliNjlkYTliYWEwMzlhZDAzOGZlZDYyNTgwNmQyMzqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbFVjTW96aWxs\nYS81LjAgKFdpbmRvd3MgTlQgNi4xKSBBcHBsZVdlYktpdC81MzcuMSAoS0hUTUwsIGxpa2UgR2Vj\na28pIENocm9tZS8yMS4wLjExODAuNjAgU2FmYXJpLzUzNy4xfXECWCkAAAAvdmFyL3d3dy9jb2Jy\nYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbEqivSVQc3Uu\n', '2012-08-25 10:04:19'),
('8a764ef3f15114817ad91d00228bc053', 'NTVkODA0Y2YyM2NiNGU0YTgyZWMzODRmZTQ3MDQzMjY2ZDFiOTMwOTqAAn1xAShVC2N1cnJlbnRw\nYWdlWCAAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvaW5kZXguaHRtbHECVQN1aWSKAQFVD19zZXNz\naW9uX2V4cGlyeUsAVQptb2RpZnlUaW1lfXEDKFgtAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3Ay\nL2Nzcy9pbm5lcmNzcy9hYmMuY3NzSl/sJVBYIQAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9oZWFk\nZXIuaHRtbEpf7CVQaAJKX+wlUFgmAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3AyL2Nzcy9zdHls\nZS5jc3NKX+wlUFgeAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL2FiYy5odG1sSl/sJVBYIQAAAC92\nYXIvd3d3L2NvYnJhL3d3dy9wMi9mb290ZXIuaHRtbEpf7CVQdXUu\n', '2012-08-25 14:09:24'),
('31c05c354ef95f583b29efa5ff182e19', 'ZTMzZjhiNzk4OGRhYmU4MjVhYWZlNGU4N2NkYWMyMzQ4OWEzZTg0NzqAAn1xAShVZE1vemlsbGEv\nNS4wIChYMTE7IExpbnV4IGk2ODYpIEFwcGxlV2ViS2l0LzUzNy4xIChLSFRNTCwgbGlrZSBHZWNr\nbykgQ2hyb21lLzIxLjAuMTE4MC43NSBTYWZhcmkvNTM3LjFxAn1xA1gnAAAAL3Zhci93d3cvY29i\ncmEvd3d3L2Jhc2UvZmVraXQvZGVtby5odG1scQRKWqklUHNVC2N1cnJlbnRwYWdlcQVoBFUDdWlk\nigEBVQ9fc2Vzc2lvbl9leHBpcnlLAHUu\n', '2012-08-25 21:05:47'),
('b69a84616604148880c10fcabdc2b03a', 'MTZjNTkxMzMyY2MyNWYzZjQ0ZGIyMzQ4Yzg0OWMwY2QyYjZkYjMyMDqAAn1xAShVZE1vemlsbGEv\nNS4wIChYMTE7IExpbnV4IGk2ODYpIEFwcGxlV2ViS2l0LzUzNy4xIChLSFRNTCwgbGlrZSBHZWNr\nbykgQ2hyb21lLzIxLjAuMTE4MC43NSBTYWZhcmkvNTM3LjF9cQIoWCUAAAAvdmFyL3d3dy9jb2Jy\nYS9zdGF0aWMvdGVzdC9qcy90ZXN0LmpzSnbhD1BYIwAAAC92YXIvd3d3L2NvYnJhL3d3dy90ZXN0\nL3NfZ18yNy5odG1sStx7JlBYKAAAAC92YXIvd3d3L2NvYnJhL3N0YXRpYy90ZXN0L2Nzcy9sZXNz\nLmxlc3NKE3kXUFgjAAAAL3Zhci93d3cvY29icmEvd3d3L3Rlc3QvaGVhZGVyLmh0bWxKs7QfUFgo\nAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3Rlc3QvY3NzL3N0eWxlLmNzc0qKqSRQWCMAAAAvdmFy\nL3d3dy9jb2JyYS93d3cvdGVzdC9mb290ZXIuaHRtbEp+Wg9QdVULY3VycmVudHBhZ2VYIwAAAC92\nYXIvd3d3L2NvYnJhL3d3dy90ZXN0L3NfZ18yNy5odG1sVQN1aWSKAQFVD19zZXNzaW9uX2V4cGly\neUsAdS4=\n', '2012-08-25 23:35:57'),
('83ce99bfda5cd8af65ffdf2daea4f038', 'Nzc1OWFiNjQ0MWYwNTI4MzcxN2U0YTUwZWRlMjgzYTgzMjFmNzM4ZDqAAn1xAShVC2N1cnJlbnRw\nYWdlWCMAAAAvdmFyL3d3dy9jb2JyYS93d3cvdGVzdC95X2dfMzIuaHRtbHECVQ9fc2Vzc2lvbl9l\neHBpcnlLAFUDdWlkigEBVWRNb3ppbGxhLzUuMCAoWDExOyBMaW51eCBpNjg2KSBBcHBsZVdlYktp\ndC81MzcuMSAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8yMS4wLjExODAuNzUgU2FmYXJpLzUz\nNy4xfXEDKFglAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3Rlc3QvanMvdGVzdC5qc0p24Q9QWCgA\nAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvdGVzdC9jc3MvbGVzcy5sZXNzShN5F1BoAkoWdbNPWCMA\nAAAvdmFyL3d3dy9jb2JyYS93d3cvdGVzdC9oZWFkZXIuaHRtbEqztB9QWCgAAAAvdmFyL3d3dy9j\nb2JyYS9zdGF0aWMvdGVzdC9jc3Mvc3R5bGUuY3NzSoqpJFBYIwAAAC92YXIvd3d3L2NvYnJhL3d3\ndy90ZXN0L2Zvb3Rlci5odG1sSn5aD1B1dS4=\n', '2012-08-26 19:56:44'),
('69d25018ad45a2a592b34920dd0efe17', 'N2UyMDlmMmVhYjkwMTM1ZThhNTNjNTZmN2YyYjA5MTFkODA3ZWIwNzqAAn1xAShVA3VpZHECigEB\nVQ9fc2Vzc2lvbl9leHBpcnlxA0sAdS4=\n', '2012-08-26 09:10:13'),
('e607993b7661d0974dc27f208c4e7389', 'MTVmYzZjOTFmZDdhMjg0ZDhmZGMwMDUzZWE4YjFkYjc5ZThhNzhmYzqAAn1xAShVC2N1cnJlbnRw\nYWdlWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbHECVQ9fc2Vz\nc2lvbl9leHBpcnlLAFUDdWlkigEBVWRNb3ppbGxhLzUuMCAoWDExOyBMaW51eCBpNjg2KSBBcHBs\nZVdlYktpdC81MzcuMSAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8yMS4wLjExODAuNzUgU2Fm\nYXJpLzUzNy4xfXEDaAJKz3UmUHN1Lg==\n', '2012-08-27 17:53:04'),
('697d81cc1c5ec9953000cb72b06da6d3', 'MmVkYzk4OGQ0ZWU1OWIxM2JlMzI0N2Y3NTc0OGQ1NTU3ODYwNjMzZDqAAn1xAShVC2N1cnJlbnRw\nYWdlWDMAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvcGlubmVyL2FiYy9lZmcvaGprL2luZGV4Lmh0\nbWxxAlVoTW96aWxsYS80LjAgKGNvbXBhdGlibGU7IE1TSUUgOC4wOyBXaW5kb3dzIE5UIDUuMTsg\nVHJpZGVudC80LjA7IFNWMTsgUVFEb3dubG9hZCA3MTc7IC5ORVQgQ0xSIDIuMC41MDcyNyl9cQMo\nWCcAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9kZW1vLmh0bWxKWqklUFgpAAAAL3Zh\nci93d3cvY29icmEvd3d3L2Jhc2UvZmVraXQvUkVBRE1FLmh0bWxKS20uUHVVW01vemlsbGEvNC4w\nIChjb21wYXRpYmxlOyBNU0lFIDYuMDsgV2luZG93cyBOVCA1LjE7IFNWMTsgUVFEb3dubG9hZCA3\nMDg7IC5ORVQgQ0xSIDIuMC41MDcyNyl9cQQoWCYAAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIv\nY3NzL3N0eWxlLmNzc0qKxCRQWC0AAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL2lubmVy\nY3NzL2FiYy5jc3NKi4IjUFgeAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL19sMS5odG1sSjSDI1BY\nIgAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9faW1wb3J0Lmh0bWxKrsQkUHVVW01vemlsbGEvNC4w\nIChjb21wYXRpYmxlOyBNU0lFIDcuMDsgV2luZG93cyBOVCA1LjE7IFNWMTsgUVFEb3dubG9hZCA3\nMTc7IC5ORVQgQ0xSIDIuMC41MDcyNyl9cQUoWCcAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9m\nZWtpdC9kZW1vLmh0bWxKWqklUFgpAAAAL3Zhci93d3cvY29icmEvd3d3L2Jhc2UvZmVraXQvUkVB\nRE1FLmh0bWxKS20uUHVVW01vemlsbGEvNC4wIChjb21wYXRpYmxlOyBNU0lFIDYuMDsgV2luZG93\ncyBOVCA1LjE7IFNWMTsgUVFEb3dubG9hZCA3MTc7IC5ORVQgQ0xSIDIuMC41MDcyNyl9cQYoWC0A\nAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL2lubmVyY3NzL2FiYy5jc3NKi4IjUFghAAAA\nL3Zhci93d3cvY29icmEvd3d3L3AyL2hlYWRlci5odG1sSlHeJFBYHgAAAC92YXIvd3d3L2NvYnJh\nL3d3dy9wMi9fbDEuaHRtbEo0gyNQWB4AAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvYWJjLmh0bWxK\nCN4kUFghAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL2Zvb3Rlci5odG1sSgrVH1BoAko0lCdQWCYA\nAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL3N0eWxlLmNzc0qKxCRQdXUu\n', '2012-09-01 23:03:15'),
('33816ac82e93451d122609c639b34978', 'Nzc0YWUyZGE1NGY5MTBmZTM2YjU1NTY3NWIzYzE2MDc2NWU3ZDkxYjqAAn1xAShVC2N1cnJlbnRw\nYWdlWCAAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvaW5kZXguaHRtbHECVUZNb3ppbGxhLzUuMCAo\nY29tcGF0aWJsZTsgTVNJRSA5LjA7IFdpbmRvd3MgTlQgNi4xOyBXT1c2NDsgVHJpZGVudC81LjAp\ncQN9cQQoWC0AAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL2lubmVyY3NzL2FiYy5jc3NK\ni4IjUFghAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL2hlYWRlci5odG1sSlHeJFBoAkqzASdQWB4A\nAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvX2wxLmh0bWxKNIMjUFgeAAAAL3Zhci93d3cvY29icmEv\nd3d3L3AyL2FiYy5odG1sSgjeJFBYIQAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9mb290ZXIuaHRt\nbEoK1R9QWCYAAAAvdmFyL3d3dy9jb2JyYS9zdGF0aWMvcDIvY3NzL3N0eWxlLmNzc0qKxCRQdVWo\nTW96aWxsYS80LjAgKGNvbXBhdGlibGU7IE1TSUUgNy4wOyBXaW5kb3dzIE5UIDYuMTsgV09XNjQ7\nIFRyaWRlbnQvNS4wOyBTTENDMjsgLk5FVCBDTFIgMi4wLjUwNzI3OyAuTkVUIENMUiAzLjUuMzA3\nMjk7IC5ORVQgQ0xSIDMuMC4zMDcyOTsgTWVkaWEgQ2VudGVyIFBDIDYuMDsgLk5FVDQuMEMpfXEF\nWCkAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9mZWtpdC9SRUFETUUuaHRtbErPdSZQc3Uu\n', '2012-08-27 18:10:51'),
('25f96458f7cea25914d5ce2bf7aa1b25', 'ZDMwMDkzMDU3MjZlNjdmYWUzYTRmNDNkNTQ4MTNmZGE1NzBiMzE5NTqAAn1xAShVC2N1cnJlbnRw\nYWdlWCAAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvaW5kZXguaHRtbHECVQ9fc2Vzc2lvbl9leHBp\ncnlLAFUDdWlkigEBVWRNb3ppbGxhLzUuMCAoWDExOyBMaW51eCBpNjg2KSBBcHBsZVdlYktpdC81\nMzcuMSAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8yMS4wLjExODAuNzUgU2FmYXJpLzUzNy4x\nfXEDKFgtAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3AyL2Nzcy9pbm5lcmNzcy9hYmMuY3NzSouC\nI1BYIQAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9oZWFkZXIuaHRtbEpR3iRQaAJKswEnUFgeAAAA\nL3Zhci93d3cvY29icmEvd3d3L3AyL19sMS5odG1sSjSDI1BYHgAAAC92YXIvd3d3L2NvYnJhL3d3\ndy9wMi9hYmMuaHRtbEoI3iRQWCEAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvZm9vdGVyLmh0bWxK\nCtUfUFgmAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3AyL2Nzcy9zdHlsZS5jc3NKisQkUHV1Lg==\n', '2012-08-27 19:48:10'),
('302511dc5acbd6b11d97faa0c1593d79', 'N2UyMDlmMmVhYjkwMTM1ZThhNTNjNTZmN2YyYjA5MTFkODA3ZWIwNzqAAn1xAShVA3VpZHECigEB\nVQ9fc2Vzc2lvbl9leHBpcnlxA0sAdS4=\n', '2012-08-28 16:12:12'),
('9ec50c518184635406a8c50d799b6615', 'MTAxZjg5ODljODUzOTQ4NzYwMTY4NTE4ZWI5ODk0MjQxN2IzMWEwOTqAAn1xAShVC2N1cnJlbnRw\nYWdlWB4AAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvX2wyLmh0bWxxAlVkTW96aWxsYS81LjAgKFgx\nMTsgTGludXggaTY4NikgQXBwbGVXZWJLaXQvNTM3LjEgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJv\nbWUvMjEuMC4xMTgwLjc5IFNhZmFyaS81MzcuMX1xAyhYLQAAAC92YXIvd3d3L2NvYnJhL3N0YXRp\nYy9wMi9jc3MvaW5uZXJjc3MvYWJjLmNzc0qLgiNQaAJKI9QfUFgmAAAAL3Zhci93d3cvY29icmEv\nc3RhdGljL3AyL2Nzcy9zdHlsZS5jc3NKisQkUFgiAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL19p\nbXBvcnQuaHRtbEquxCRQdVUDdWlkigEBVQ9fc2Vzc2lvbl9leHBpcnlLAHUu\n', '2012-08-30 23:04:51'),
('cdcca8dd1d4cfb96b98825b8c8faa806', 'ZTU0NDEwYmEwZDdhY2IzNDM1MjkxNDIxN2ZlM2FkMTAwMTNiYTQ5MzqAAn1xAShVC2N1cnJlbnRw\nYWdlWCMAAAAvdmFyL3d3dy9jb2JyYS93d3cvdGVzdC95X2dfMTUuaHRtbHECVUxNb3ppbGxhLzUu\nMCAoWDExOyBVYnVudHU7IExpbnV4IGk2ODY7IHJ2OjE0LjApIEdlY2tvLzIwMTAwMTAxIEZpcmVm\nb3gvMTQuMC4xfXEDKGgCSi7Izk9YJQAAAC92YXIvd3d3L2NvYnJhL3N0YXRpYy90ZXN0L2pzL3Rl\nc3QuanNKduEPUFgoAAAAL3Zhci93d3cvY29icmEvc3RhdGljL3Rlc3QvY3NzL2xlc3MubGVzc0oT\neRdQWCMAAAAvdmFyL3d3dy9jb2JyYS93d3cvdGVzdC9oZWFkZXIuaHRtbEqztB9QWCgAAAAvdmFy\nL3d3dy9jb2JyYS9zdGF0aWMvdGVzdC9jc3Mvc3R5bGUuY3NzSoqpJFBYIwAAAC92YXIvd3d3L2Nv\nYnJhL3d3dy90ZXN0L2Zvb3Rlci5odG1sSn5aD1B1dS4=\n', '2012-08-30 23:35:08'),
('229be739442454d5640304ba871e4672', 'NzJhZjI4ZjRlNTNmNTM1YmZhMjc0ZTI5ZTIxMGUwMThiZmVkZGY0YTqAAn1xAShVC2N1cnJlbnRw\nYWdlWDUAAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9ib290c3RyYXAvbGVzcy92YXJpYWJsZXMu\nbGVzc3ECVWRNb3ppbGxhLzUuMCAoWDExOyBMaW51eCBpNjg2KSBBcHBsZVdlYktpdC81MzcuMSAo\nS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8yMS4wLjExODAuNzkgU2FmYXJpLzUzNy4xfXEDKGgC\nShXKKFBYKQAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1sSs91JlB1\nVQN1aWSKAQFVD19zZXNzaW9uX2V4cGlyeUsAdS4=\n', '2012-08-31 16:24:26'),
('8b138c9a302fe54e334652156e63a56c', 'N2UyMDlmMmVhYjkwMTM1ZThhNTNjNTZmN2YyYjA5MTFkODA3ZWIwNzqAAn1xAShVA3VpZHECigEB\nVQ9fc2Vzc2lvbl9leHBpcnlxA0sAdS4=\n', '2012-08-31 23:02:26'),
('591c503742a293e9581595e65fefb5fd', 'OGExYTIzN2ZhYTY3ZGJiNWYxOGNiMjBlNGEzMWNjYjU4YjQxNWI1YjqAAn1xAShVC2N1cnJlbnRw\nYWdlWDMAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvcGlubmVyL2FiYy9lZmcvaGprL2luZGV4Lmh0\nbWxxAlVkTW96aWxsYS81LjAgKFgxMTsgTGludXggaTY4NikgQXBwbGVXZWJLaXQvNTM3LjEgKEtI\nVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMjEuMC4xMTgwLjc5IFNhZmFyaS81MzcuMX1xAyhYLQAA\nAC92YXIvd3d3L2NvYnJhL3N0YXRpYy9wMi9jc3MvaW5uZXJjc3MvYWJjLmNzc0qLgiNQWCEAAAAv\ndmFyL3d3dy9jb2JyYS93d3cvcDIvaGVhZGVyLmh0bWxKUd4kUFgeAAAAL3Zhci93d3cvY29icmEv\nd3d3L3AyL19sMS5odG1sSjSDI1BYHgAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9hYmMuaHRtbEoI\n3iRQWCEAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvZm9vdGVyLmh0bWxKCtUfUGgCSjSUJ1BYJgAA\nAC92YXIvd3d3L2NvYnJhL3N0YXRpYy9wMi9jc3Mvc3R5bGUuY3NzSorEJFB1VQN1aWSKAQFVD19z\nZXNzaW9uX2V4cGlyeUsAdS4=\n', '2012-09-01 13:55:45'),
('de3e2eb14e7373c71a59ca4e8e01bdef', 'MTAxZjg5ODljODUzOTQ4NzYwMTY4NTE4ZWI5ODk0MjQxN2IzMWEwOTqAAn1xAShVC2N1cnJlbnRw\nYWdlWB4AAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvX2wyLmh0bWxxAlVkTW96aWxsYS81LjAgKFgx\nMTsgTGludXggaTY4NikgQXBwbGVXZWJLaXQvNTM3LjEgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJv\nbWUvMjEuMC4xMTgwLjc5IFNhZmFyaS81MzcuMX1xAyhYLQAAAC92YXIvd3d3L2NvYnJhL3N0YXRp\nYy9wMi9jc3MvaW5uZXJjc3MvYWJjLmNzc0qLgiNQaAJKI9QfUFgmAAAAL3Zhci93d3cvY29icmEv\nc3RhdGljL3AyL2Nzcy9zdHlsZS5jc3NKisQkUFgiAAAAL3Zhci93d3cvY29icmEvd3d3L3AyL19p\nbXBvcnQuaHRtbEquxCRQdVUDdWlkigEBVQ9fc2Vzc2lvbl9leHBpcnlLAHUu\n', '2012-09-01 22:19:33'),
('4e583f4f64ac2cb1697e17c603ed7da0', 'MjUzMTRjNmJmNjdiODQ4MmZlOWYwZDY0ZWZhZmFiZjEwNTQwOWY5ZTqAAn1xAShVC2N1cnJlbnRw\nYWdlcQJYJwAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L2RlbW8uaHRtbHEDVWRNb3pp\nbGxhLzUuMCAoWDExOyBMaW51eCBpNjg2KSBBcHBsZVdlYktpdC81MzcuMSAoS0hUTUwsIGxpa2Ug\nR2Vja28pIENocm9tZS8yMS4wLjExODAuNzkgU2FmYXJpLzUzNy4xcQR9cQUoaANKWqklUFgpAAAA\nL3Zhci93d3cvY29icmEvd3d3L2Jhc2UvZmVraXQvUkVBRE1FLmh0bWxKS20uUHVVA3VpZIoBAVUP\nX3Nlc3Npb25fZXhwaXJ5SwB1Lg==\n', '2012-09-02 21:41:20'),
('34e0f83d307410470c1034fa05f89e2a', 'OTQzMDk0OWI0ZGUzZDk0MjZmYjQwNDg4NmJjMmUyMTdmNTgxZTY1ZTqAAn1xAShVC2N1cnJlbnRw\nYWdlcQJYKQAAAC92YXIvd3d3L2NvYnJhL3d3dy9iYXNlL2Zla2l0L1JFQURNRS5odG1scQNVZE1v\nemlsbGEvNS4wIChYMTE7IExpbnV4IGk2ODYpIEFwcGxlV2ViS2l0LzUzNy4xIChLSFRNTCwgbGlr\nZSBHZWNrbykgQ2hyb21lLzIxLjAuMTE4MC43OSBTYWZhcmkvNTM3LjFxBH1xBWgDSkttLlBzVQN1\naWSKAQFVD19zZXNzaW9uX2V4cGlyeUsAdS4=\n', '2012-09-02 13:05:32'),
('187ff57183295b508ab3eb5917e3810e', 'NzliYjg4MDQxMjJhOWQ3MTE5MzFlOTRjNjY1NDdhZWJiNWU1YWQ0OTqAAn1xAShVC2N1cnJlbnRw\nYWdlWD0AAAAvdmFyL3d3dy9jb2JyYS93d3cvYmFzZS9ib290c3RyYXAvZG9jcy9hc3NldHMvanMv\nYm9vdHN0cmFwLmpzcQJVZE1vemlsbGEvNS4wIChYMTE7IExpbnV4IGk2ODYpIEFwcGxlV2ViS2l0\nLzUzNy4xIChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzIxLjAuMTE4MC43OSBTYWZhcmkvNTM3\nLjF9cQMoaAJKspgxUFgpAAAAL3Zhci93d3cvY29icmEvd3d3L2Jhc2UvZmVraXQvUkVBRE1FLmh0\nbWxKS20uUHVVA3VpZIoBAVUPX3Nlc3Npb25fZXhwaXJ5SwB1Lg==\n', '2012-09-03 14:33:40'),
('bcb79f2c0d93da88810239f30df00781', 'MjhiMDBkMTczYTk5YzU4ODEyNGE5YTg2YTcyMTg3YjNjYWQ0ZDBmMzqAAn1xAShVC2N1cnJlbnRw\nYWdlWDMAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvcGlubmVyL2FiYy9lZmcvaGprL2luZGV4Lmh0\nbWxxAlVkTW96aWxsYS81LjAgKFgxMTsgTGludXggaTY4NikgQXBwbGVXZWJLaXQvNTM3LjEgKEtI\nVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMjEuMC4xMTgwLjc5IFNhZmFyaS81MzcuMX1xAyhYLQAA\nAC92YXIvd3d3L2NvYnJhL3N0YXRpYy9wMi9jc3MvaW5uZXJjc3MvYWJjLmNzc0qLgiNQWCEAAAAv\ndmFyL3d3dy9jb2JyYS93d3cvcDIvaGVhZGVyLmh0bWxKUd4kUFgeAAAAL3Zhci93d3cvY29icmEv\nd3d3L3AyL19sMS5odG1sSjSDI1BYHgAAAC92YXIvd3d3L2NvYnJhL3d3dy9wMi9hYmMuaHRtbEoI\n3iRQWCEAAAAvdmFyL3d3dy9jb2JyYS93d3cvcDIvZm9vdGVyLmh0bWxKCtUfUGgCSoD2MVBYJgAA\nAC92YXIvd3d3L2NvYnJhL3N0YXRpYy9wMi9jc3Mvc3R5bGUuY3NzSorEJFB1VQN1aWSKAQFVD19z\nZXNzaW9uX2V4cGlyeUsAdS4=\n', '2012-09-03 16:49:57');

-- --------------------------------------------------------

--
-- 表的结构 `system_group`
--

CREATE TABLE IF NOT EXISTS `system_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(20) NOT NULL,
  `name_zh` varchar(40) NOT NULL,
  `rights` longtext NOT NULL,
  `desc` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_en` (`name_en`),
  UNIQUE KEY `name_zh` (`name_zh`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `system_group`
--

INSERT INTO `system_group` (`id`, `name_en`, `name_zh`, `rights`, `desc`) VALUES
(1, 'admin', '管理员', '^/system/add', 'asdadasd');

-- --------------------------------------------------------

--
-- 表的结构 `system_news`
--

CREATE TABLE IF NOT EXISTS `system_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ctime` datetime NOT NULL,
  `category` varchar(30) NOT NULL,
  `cid` int(11) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `system_news`
--


-- --------------------------------------------------------

--
-- 表的结构 `system_project`
--

CREATE TABLE IF NOT EXISTS `system_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(100) NOT NULL,
  `name_zh` varchar(200) NOT NULL,
  `summary` longtext NOT NULL,
  `state` varchar(20) NOT NULL,
  `starttime` datetime NOT NULL,
  `period` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `manager` int(11) NOT NULL,
  `ctime` datetime NOT NULL,
  `degree` int(11) NOT NULL,
  `weight` varchar(20) NOT NULL,
  `refile` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_en` (`name_en`),
  UNIQUE KEY `name_zh` (`name_zh`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `system_project`
--

INSERT INTO `system_project` (`id`, `name_en`, `name_zh`, `summary`, `state`, `starttime`, `period`, `author`, `manager`, `ctime`, `degree`, `weight`, `refile`) VALUES
(1, 'test', '测试项目1', '测试项目', 'b_doing', '2012-07-19 09:30:00', 29, 1, 2, '2012-08-09 20:50:12', 0, 'd_rightnow', '"header.html","footer.html","group.html","p1.html","user.html","y_g_16.html","addposts.html","y_g_17.html","abc/header.html","abc/ddd/ad.html","abc/ddd/x.xml","y_g_40.html","500.html","search_shixun_list.html","search_terminal.html","y_g_23.html"'),
(2, 'p2', '测试项目2', '测试项目2', 'b_doing', '2012-07-19 09:30:00', 29, 1, 3, '2012-08-09 20:50:58', 47, 'b_higher', '"header.html","footer.html","abc.html","_l1.html"'),
(3, 'test3', '测试项目3', '测试项目3', 'd_reviseing', '2012-07-19 09:30:00', 999, 1, 5, '2012-08-09 20:51:31', 0, 'a_commonly', '"header.html","footer.html"'),
(4, 'test4', '测试4', '测试项目4', 'd_reviseing', '2012-07-19 09:30:00', 999, 1, 6, '2012-08-09 20:52:10', 0, 'a_commonly', '"header.html","footer.html"'),
(5, 'test5', '测试项目5', '测试项目5', 'a_nostart', '2012-07-19 09:30:00', 29, 1, 3, '2012-08-09 20:53:13', 0, 'b_higher', '"header.html","footer.html"'),
(6, 'test6', '测试项目6', '测试项目6', 'a_nostart', '2012-07-19 09:30:00', 29, 1, 1, '2012-08-09 20:53:38', 0, 'd_rightnow', '"header.html","footer.html"'),
(7, 'test7', '测试7', '测试7', 'b_doing', '2012-07-19 09:30:00', 29, 1, 1, '2012-08-09 20:53:59', 0, 'd_rightnow', '"header.html","footer.html"'),
(8, 'test8', '测试8', '测试8', 'b_doing', '2012-07-19 09:30:00', 29, 1, 2, '2012-08-09 20:54:47', 0, 'd_rightnow', '"header.html","footer.html"'),
(9, 'base', '基础模块库', '基础模块库', 'b_doing', '2012-08-10 16:33:14', 99999, 1, 1, '2012-08-10 16:34:15', 0, 'b_higher', '"header.html","footer.html","fekit/README.html"');

-- --------------------------------------------------------

--
-- 表的结构 `system_rights`
--

CREATE TABLE IF NOT EXISTS `system_rights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rights` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 转存表中的数据 `system_rights`
--


-- --------------------------------------------------------

--
-- 表的结构 `system_task`
--

CREATE TABLE IF NOT EXISTS `system_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `desc` longtext NOT NULL,
  `author` int(11) NOT NULL,
  `state` varchar(50) NOT NULL,
  `manager` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `degree` int(11) NOT NULL,
  `weight` varchar(20) NOT NULL,
  `ctime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `system_task`
--

INSERT INTO `system_task` (`id`, `name`, `desc`, `author`, `state`, `manager`, `pid`, `degree`, `weight`, `ctime`) VALUES
(1, '阿斯大', '阿斯大速度', 1, 'a_new', 0, 1, 24, 'd_rightnow', '2012-08-23 00:00:00'),
(2, '卡加速度', '阿斯大了的', 1, 'b_apportion', 0, 3, 100, 'c_exigence', '2012-08-07 00:00:00'),
(3, '开店卡死的', '阿达打算大', 1, 'c_doing', 0, 1, 64, 'd_rightnow', '2012-08-29 00:00:00'),
(4, '哦iasld', '阿达啦啦队拉萨的', 1, 'd_confirming', 0, 3, 87, 'b_higher', '2012-08-07 00:00:00'),
(5, 'asd', '看看两端拉动的', 1, 'e_reviseing', 0, 4, 100, 'a_commonly', '2012-08-31 00:00:00'),
(6, '哦阿达拉萨大大所', '阿斯达到所', 1, 'f_over', 0, 2, 13, 'd_rightnow', '2012-08-28 00:00:00'),
(7, 'aksdkakd', 'adadasld', 1, 'a_new', 0, 2, 54, 'd_rightnow', '2012-08-16 00:00:00'),
(8, '阿斯大达到', '阿斯大打算大速度阿斯大速度阿斯大速度', 1, 'a_new', 0, 0, 9, 'b_higher', '2012-08-17 00:00:00'),
(9, '阿斯大卡卡点卡', '阿达达到垃圾斯柯达拉萨凯迪拉克大lskdasldjalsdkjasdjalsd 阿达达到垃圾斯柯达拉萨凯迪拉克大lskdasldjalsdkjasdjalsd 阿达达到垃圾斯柯达拉萨凯迪拉克大lskdasldjalsdkjasdjalsd ', 1, 'a_new', 0, 7, 0, 'd_rightnow', '2012-08-19 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `system_user`
--

CREATE TABLE IF NOT EXISTS `system_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usm` varchar(100) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `name_zh` varchar(100) NOT NULL,
  `email` varchar(75) NOT NULL,
  `group` int(11) NOT NULL,
  `department` varchar(30) NOT NULL,
  `state` int(11) NOT NULL,
  `upic` varchar(30) NOT NULL,
  `regtime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usm` (`usm`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `system_user`
--

INSERT INTO `system_user` (`id`, `usm`, `pwd`, `name_zh`, `email`, `group`, `department`, `state`, `upic`, `regtime`) VALUES
(1, 'liufeng', '111', '刘锋', 'liufeng@cctvcjw.com', 1, '前端组', 0, 'normal.png', '2012-08-08 00:00:00'),
(2, 'aks', '123', '啊擦', 'asdks@qq.com', 1, '开发组', 0, 'normal.png', '2012-08-30 00:00:00'),
(3, 'klsk', '123', '看了看所', 'klks@qq.com', 1, '测试组', 0, 'normal.png', '2012-08-03 00:00:00'),
(4, 'kos', '123', '看哦所', 'kos@qq.com', 1, '编辑部', 0, 'normal.png', '2012-08-05 00:00:00'),
(5, 'mls', '123', '马拉松', 'mls@qq.com', 1, '设计部', 0, 'normal.png', '2012-08-04 00:00:00'),
(6, 'cage', '123', '打算大', 'dsl@@qq.com', 1, '开发组', 0, 'normal.png', '2012-08-06 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `system_user_project`
--

CREATE TABLE IF NOT EXISTS `system_user_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;

--
-- 转存表中的数据 `system_user_project`
--

INSERT INTO `system_user_project` (`id`, `uid`, `pid`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 2, 6),
(8, 3, 6),
(9, 4, 6),
(10, 5, 6),
(11, 6, 6),
(12, 1, 7),
(13, 2, 7),
(14, 3, 7),
(15, 4, 7),
(16, 5, 7),
(17, 1, 8),
(18, 4, 8),
(19, 6, 8),
(21, 3, 1),
(22, 4, 1),
(23, 1, 2),
(24, 4, 2),
(25, 1, 3),
(26, 6, 3),
(27, 1, 4),
(28, 3, 4),
(29, 1, 5),
(30, 4, 5),
(31, 1, 6),
(32, 3, 6),
(33, 4, 7),
(34, 5, 7),
(35, 1, 8),
(36, 4, 8),
(37, 1, 9);

-- --------------------------------------------------------

--
-- 表的结构 `system_user_task`
--

CREATE TABLE IF NOT EXISTS `system_user_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `tid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `system_user_task`
--

INSERT INTO `system_user_task` (`id`, `uid`, `tid`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- 表的结构 `tools_tools`
--

CREATE TABLE IF NOT EXISTS `tools_tools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_en` varchar(50) NOT NULL,
  `name_zh` varchar(50) NOT NULL,
  `doc` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_en` (`name_en`),
  UNIQUE KEY `name_zh` (`name_zh`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `tools_tools`
--

INSERT INTO `tools_tools` (`id`, `name_en`, `name_zh`, `doc`) VALUES
(1, 'codeCompress', '代码压缩', '代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩代码压缩'),
(2, 'autoReload', '自动刷新', '自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新自动刷新'),
(3, 'randomImg', '随机前景图', '随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图随机前景图');
