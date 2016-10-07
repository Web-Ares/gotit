<?php

$json_data = '

                   <h3>Development</h3>

                    <!--sevices__text-->
                    <p class="sevices__text">
                      he end of the day, we attract, not distract your users. Our goal is to create personal moments that drive actionable results for your customers, and ultimately, your business. This is the type of service we believe in.
                    </p>
                    <!--/sevices__text-->

';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

echo $json_data;
exit;
?>
