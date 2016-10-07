<?php

$json_data = '

                   <h3>It’s all in the details.</h3>

                    <!--sevices__text-->
                    <p class="sevices__text">
                        Our UX Design team knows form and function — but every project comes with a unique process— and that’s to learn more about your users directly from the source — you.
                        Because at the end of the day, we attract, not distract your users. Our goal is to create personal moments that drive actionable results for your customers, and ultimately, your business. This is the type of service we believe in.
                    </p>
                    <!--/sevices__text-->

                    <!--sevices__info-->
                    <div class="sevices__info">

                        <!--sevices__info-title-->
                        <h4 class="sevices__info-title">Here is what our team has up their sleeve:</h4>
                        <!--/sevices__info-title-->

                        <!--sevices__info-list-->
                        <div class="sevices__info-list">

                            <!--sevices__info-item-->
                            <dl class="sevices__info-item">

                                <dt>
                                    Strategy Documentation
                                </dt>
                                <dd>
                                    — This is a roundtable for your stakeholders and our team to discuss business logic in able to align our strategy with your company’s goals.
                                </dd>

                            </dl>
                            <!--/sevices__info-item-->

                            <!--sevices__info-item-->
                            <dl class="sevices__info-item">

                                <dt>User Research</dt>
                                <dd>— To outline the design process, we look at the end user and the actions you want to trigger across your website. This phase also involves project requirement scope, along with the possibility of user interviews/surveys and a review of your content inventory and other data.
                                </dd>

                            </dl>
                            <!--/sevices__info-item-->

                            <!--sevices__info-item-->
                            <dl class="sevices__info-item">

                                <dt>
                                    Design
                                </dt>
                                <dd>
                                    — Creativity comes in all shapes and sizes. This is when we air out some ideas and pick the one to move forward with.
                                </dd>

                            </dl>
                            <!--/sevices__info-item-->

                            <!--sevices__info-item-->
                            <dl class="sevices__info-item">

                                <dt>
                                    Testing
                                </dt>
                                <dd>
                                    — To understand which design best complements your customers’ behavior and intent, we need to test and refine. That means we unleash our data-obsessed team to use advanced testing tools and techniques to optimize for optimal results.
                                </dd>

                            </dl>
                            <!--/sevices__info-item-->

                            <!--sevices__info-item-->
                            <dl class="sevices__info-item">

                                <dt>
                                    Production and Implementation
                                </dt>
                                <dd>
                                    — After a series of tests and revisions, we finalize design and push to production. Our team will assist with implementation and any questions that arise during the final stage.
                                </dd>

                            </dl>
                            <!--/sevices__info-item-->

                        </div>
                        <!--/sevices__info-list-->

                        <!--sevices__info-title-->
                        <h4 class="sevices__info-title">WANT TO DISCUSS OUR PROJECT WITH OUR UX/UI SPECIALIST?</h4>
                        <!--/sevices__info-title-->

                    </div>
                    <!--/sevices__info-->

';


$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);

echo $json_data;
exit;
?>
