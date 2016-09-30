<?php
    $json_data = '{
        "SEND_OK":"письмо отправлено"
    }';

    $json_data = str_replace("\r\n",'',$json_data);
    $json_data = str_replace("\n",'',$json_data);


echo $json_data;
exit;
?>
