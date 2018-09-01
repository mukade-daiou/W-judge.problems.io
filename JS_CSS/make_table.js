function user_data(){
    this.ac_ct=0;this.author_ct=0;
    this.ac_problems=[];
    this.author_problems=[];
    this.other_problems=[]
};
var P=120;//problemsの数
var S=2357;//submissionの数
var problems=[];
var user=user_data();
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const keyA = a.title.toUpperCase();
    const keyB = b.title.toUpperCase();
  
    let comparison = 0;
    if (keyA > keyB) {
      comparison = 1;
    } else if (keyA < keyB) {
      comparison = -1;
    }
    return comparison;
  }
function make_table(){
    $.getJSON("data/problems.json",function(data){
        $.each(data,function(i,obj){
        var p=new Object();
        p.title=obj["title"];
        p.score=obj["score"];
        p.author=obj["author"];
        var str="https://wjudge.wasedah-pcp.net/";
        if(obj["contest_id"]=="0"){
            str+="problem/description?problem_id="+String(i+1);
        }
        else{
            str+="contest/contest/problem_description?contest_id="
            +obj["contest_id"]+"&problem_id="+String(i+1);
        }
        p.link=str;
        p.contest_id=obj["contest_id"]//ソート用
        p.num=i+1;//ソート用
        $.getJSON("data/contests.json",function(c_data){
            //alert(obj["contest_id"])
            if(obj["contest_id"]==="0"){p.contest="-";p.contest_link=""}
            else {
                p.contest=c_data[obj["contest_id"]-1]["name"];
                p.contest_link="https://wjudge.wasedah-pcp.net/contest/contest/problem_view?contest_id="
                                        +obj["contest_id"];
            }
        })
        problems[i]=p;
        });
    })
}
function draw_table(id,tags){
    var head="<th id=h_# class=head>#</th>";
    $.each(tags,function(i,tag){
        head+="<th id=h_"+tag+" class=head>"+tag+"</th>"
    })
    $("#"+id).append(head);
    $.each(problems,function(i,obj){
        if(obj["score"]===0)return;
        var str="<tr id=p_"+obj["num"]+">";
        str+="<td class="+"num"+">"+obj["num"]+"</td>";        
        $.each(tags,function(j,tag){
            if(tag=="title"){
                str+="<td class="+tag+"><a href="+obj["link"]+" target="+"_blank"+">"+String(obj[tag])+"</a></td>";}
            else if(tag=="contest"&&obj["contest"]!="-"){
                str+="<td class="+tag+"><a href="+obj["contest_link"]+" target="+"_blank"+">"+String(obj[tag])+"</a></td>";
            }
            else str+="<td class="+tag+">"+String(obj[tag])+"</td>";
        }); 
        str+="</tr>";
        $("#"+id).append(str);
    });
}
function ac_check(username){
    $.getJSON("data/submits.json",
    function(data){
        var status=[]
        $.each(data,function(i,obj){
            if(problems[obj["problem_id"]-1]["author"]==username){
                status[obj["problem_id"]-1]="author";
            }
            else if(obj["user"]==username){
                if(obj["result"]=="Accepted"){
                    status[obj["problem_id"]-1]="ac";
                }
                else if(status[obj["problem_id"]-1]!="ac"){
                    status[obj["problem_id"]-1]="wa";
                }
            }
        })
        for(var i=1;i<=problems.length;++i){
            if(status[i-1]=="author")$("#p_"+i).css("background","#66FF33");
            else if(status[i-1]=="ac")$("#p_"+i).css("background","skyblue");
            else if(status[i-1]=="wa")$("#p_"+i).css("background","#FFFF33");
            else $("#p_"+i).css("background","white");
        }
    })
    
}
var flag=false;
$(function(){
    make_table();
    $(".textbox").click(function(){
        if(!flag)draw_table("table",["title","score","contest","author"]);
        flag=true;
    })
    $(".enter").click(function(){
        var num=$(".textbox").val();
        if(num=="mm")num="mukadenodaiou";
        if(num=="abesyougo"||num=="あべしょうご"||num=="阿部匠吾"){
            if (confirm('ページ遷移しますか？')) window.location.href = 'https://twitter.com/akusyounin2412?lang=ja';
        }
        ac_check(num);
    })
    $("#table").click(function(){
        /*$.when(
        $("#table").empty(),
        //problems.sort(compare())
        console.log(problems)
        )
        .done(function(){
            draw_table("table",["title","score","contest"]);
        });*/
    })
})