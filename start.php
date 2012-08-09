<?php
passthru("python /var/www/cobra/manage.py runserver 0.0.0.0:8000");
echo "<script>window.location =\"http://localhost:8000/system/\";</script>";
?>
