$('document').ready(function(){

    var tour = 1;


    $('#reset').on('click',function(){

        location.reload();

    });

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons : [
            {
                text : 'Recommencer',
                click : function ()
                {
                    location.reload()
                }
            }
        ]
    });

    isDraggingBlock=false;
    $(".leftright").draggable({

        containment: "#moveInHere",
        start: function(e,ui){$(this).removeClass("bump");isDraggingBlock=true;},
        stop: function(e,ui){$(this).addClass("bump");isDraggingBlock=false;

            if( $(this).attr('id') == 'auto')
            {
                /*  tester si gagne ou pas */
                if($(this).position().left >= 400)
                {
                    $( "#dialog" ).dialog("open");
                    $("#nbTour").text(tour);
                }

            }
            else
            {
                /*on incrémente le nombre d'essai */
                $('#tours').text("Nb essai(s) : "+(tour++));
            }
        },
        axis: "x"
    });

    $(".updown").draggable({

        containment: "#moveInHere",
        start: function(e,ui){$(this).removeClass("bump");isDraggingBlock=true;},
        stop: function(e,ui){$(this).addClass("bump");isDraggingBlock=false;

            /*on incrémente le nombre d'essai */
            $('#tours').text("Nb essai(s) : "+(tour++));

        },
        axis: "y"

    });

    function setContainment(who)
    {
        $who=$(who);

        var wx1=17; // width <->
        var wx2=600; // width <->
        var wy1=74; // height haut/bas
        var wy2=606; // height haut/bas
        var isLeftRight=$who.hasClass("leftright");

        var myx1=$who.position().left;
        var myy1=$who.position().top;
        var myx2=$who.width()+myx1;
        var myy2=$who.height()+myy1;

        if(isLeftRight)
        {
            wy1=myy1;
            wy2=myy2;
        }
        else
        {
            wx1=myx1;
            wx2=myx2;
        }

        $(".bump").not($who).each(function(i)
        {
            var ix1=$(this).position().left;
            var iy1=$(this).position().top;
            var ix2=$(this).width()+ix1; //right
            var iy2=$(this).height()+iy1;


            if(isLeftRight)
            {
                if(ix1>myx2 ) // it's on the right
                {
                    if( (myy1>=iy1 && myy1<=iy2) || (myy2>=iy1 && myy2<=iy2) ) //it's in the way
                    {
                        if(ix1<wx2)
                        {
                            wx2=ix1;
                        }
                    }

                }
                if(ix2<myx1 ) // it's on the left
                {
                    if( (myy1>=iy1 && myy1<=iy2) || (myy2>=iy1 && myy2<=iy2) ) //it's in the way
                    {
                        if(ix2>wx1)
                        {
                            wx1=ix2;
                        }

                    }
                }

            }
            else
            {
                if(iy1>myy2 ) // it's on the bottom
                {
                    if( (myx1>=ix1 && myx1<=ix2) || (myx2>=ix1 && myx2<=ix2) ) //it's in the way
                    {
                        if(iy1<wy2)
                            wy2=iy1;
                    }
                }
                if(iy2<myy1 ) // it's on the top
                {
                    if( (myx1>=ix1 && myx1<=ix2) || (myx2>=ix1 && myx2<=ix2) ) //it's in the way
                    {
                        if(iy2>wy1)
                            wy1=iy2;
                    }
                }
            }



        });


        $("#moveInHere").css({"left":wx1+1,"top":wy1+1,"width":wx2-2-wx1,"height":wy2-2-wy1});


    }


    $(".bump").on('mouseenter',function(){if(!isDraggingBlock)setContainment(this);});





});


