function user_data(){
    this.ac_ct=0;this.author_ct=0;
    this.ac_problems=[];
    this.author_problems=[];
    this.other_problems=[]
};
function problem_data(name,status,point){
    this.name=name;
    this.status=status;
    this.pont=point;
}
var problems=[];
var user=user_data();
function make_table(json_link,num){
    $.getJSON(json_link,function(data){
        var p=new Object();
        p.title=data["title"];
        p.score=data["score"];
        p.status="None";
        problems[num]=p;
    })
}
function draw_table(id,tags){
    $.each(problems,function(i,obj){
        if(obj["score"]===0)return;
        var str="<tr id=p_"+i+">";
        str+="<td class="+"num"+">"+String(i+1)+"</td>";        
        $.each(tags,function(j,tag){
            str+="<td class="+tag+">"+String(obj[tag])+"</td>";
        }); 
        str+="</tr>";
        $("#"+id).append(str);
    });
}
var flag=false;
$(function(){
    for(var i=0;i<120;++i){
        make_table("data/problems/"+String(i+1)+".json",i)
    }
    $(".textbox").click(function(){
        if(!flag)draw_table("table",["title","score"]);
        flag=true;
        
    })
})