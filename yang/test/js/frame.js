var year = 2017;

// change year via onClick(), from 2014 to 2017, save the changed year in var year
function pYear(){//previous year, year>2014
    a=parseInt(document.getElementById("yearFlag").innerHTML);
    if(a>2014){
        a--;
        year=a;
        document.getElementById("yearFlag").innerHTML=year;
    }
}

function nYear(){//next year, year<2017
    a=parseInt(document.getElementById("yearFlag").innerHTML);
    if(a<2017){
        a++;
        year=a;
        document.getElementById("yearFlag").innerHTML=year;
    }
}

function showOtherDiv(){//show div
    var  otherDiv=document.getElementById('otherDiv');//get the objcet to be shown
    otherDiv.style.display="block";//show
}

$(document).click(function(event){
    var _con = $('#divTop');  // for unhide area
    if(!_con.is(event.target) && _con.has(event.target).length === 0){
        $('#otherDiv').hide(300);
    }
});


