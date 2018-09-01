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
function make_table(){
    $.getJSON("data/problems.json",function(data){
        $.each(data,function(i,obj){
        var p=new Object();
        p.title=obj["title"];
        p.score=obj["score"];
        var str="https://wjudge.wasedah-pcp.net/";
        if(obj["contest_id"]=="none"){
            str+="problem/description?problem_id="+String(i+1);
        }
        else{
            str+="contest/contest/problem_description?contest_id="
            +obj["contest_id"]+"&problem_id="+String(i+1);
        }
        p.link=str;
        $.getJSON("data/contests.json",function(c_data){
            //alert(obj["contest_id"])
            if(obj["contest_id"]==="none"){p.contest="-";p.contest_link=""}
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
    $.each(problems,function(i,obj){
        if(obj["score"]===0)return;
        var str="<tr id=p_"+String(i)+">";
        str+="<td class="+"num"+">"+String(i+1)+"</td>";        
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
        var aced=[]
        $.each(data,function(i,obj){
        if(obj["user"]==username&&obj["result"]=="Accepted"){
            $("#p_"+String(obj["problem_id"]-1)).css("background","skyblue");
            aced[obj["problem_id"]-1]=true;
        }
        else{
            if(!aced[obj["problem_id"]-1])$("#p_"+String(obj["problem_id"]-1)).css("background","white");
        }
    })
    })
    
}
var flag=false;
$(function(){
    make_table();
    $(".textbox").click(function(){
        if(!flag)draw_table("table",["title","score","contest"]);
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
})
