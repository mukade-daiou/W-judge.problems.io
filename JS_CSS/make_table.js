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
            str+="<td class="+tag+">"+String(obj[tag])+"</td>";
        }); 
        str+="</tr>";
        $("#"+id).append(str);
    });
}
function ac_check(username){
    $.getJSON("data/submits.json",
    function(data){
        $.each(data,function(i,obj){
        if(obj["user"]==username&&obj["result"]=="Accepted"){
            $("#p_"+String(obj["problem_id"]-1)).css("background","skyblue");
        }
    })
    })
    
}
var flag=false;
$(function(){
    make_table();
    $(".textbox").click(function(){
        if(!flag)draw_table("table",["title","score"]);
        flag=true;
    })
    $(".enter").click(function(){
        var num=$(".textbox").val();
        ac_check(num);
    })
})