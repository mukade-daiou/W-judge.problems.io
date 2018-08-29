function user_data(){
    this.ac_ct=0;this.author_ct=0;
    this.ac_problems=[];
    this.author_problems=[];
    this.other_problems=[]
};
function problem_data(number,name,author,status,point){
    this.number=number;
    this.name=name;
    this.author=auhor;
    this.status=status;
    this.pont=point;
}
var problems=[];
function make_table(name,json_link,tags){
    $.getJSON(json_link,function(data){
        var head="<tr "+"id="+"head"+">";
        for(var i in tags){
            head+="<th>"+tags[i]+"</th>";
        }
        head+="</tr>"
        $("#"+name).append(head);
        for(var i in data){
            var str="";
            str+="<tr "+"id=table_"+i+">";
            for(var tag in tags){
                str+="<td>"+data[i][tags[tag]]+"</td>";
            }
            str+="</tr>";
            $("#"+name).append(str);
        }
    })
}

$(document).ready(function(){
    make_table("table","data/test.json",["name","solved"]);
})