//["ehhid", "d", "parent"]
var input = [
  [ 1,0,1],
  [2,1,2],
  [3,1,2],
  [4,2,3],
  [5,2,3],
  [6,3,3],
  [7,5,4],
  [8,1,2]
];
function getObject (arr ,parent,output){
  for(var j in arr){
    if(arr[j][1] === parent){
       output[arr[j][0]] = {};
       getObject(arr,arr[j][0],output[arr[j][0]]);
    }
  }
  return output;
}
function getMaxDepth(input){
  var max = 0 ;
  for(var i in input){
      if(input[i][2] > max)
          max = input[i][2];
  }
  return max;
}
function  insertObject (object, parent , child) {
  if (object.hasOwnProperty(parent)){
    object[parent][child] = {};
  }else{
    for (let i = 0; i < Object.keys(object).length; i++) {
      let value = object[Object.keys(object)[i]];
      if (typeof value === "object") {
          insertObject(object[Object.keys(object)[i]], parent , child)
      }
    }
  }
}
function depthWise(input,output){
  var depth = getMaxDepth(input);
  for(var d = 1;d<=depth;d++){
      for(var j in input){
          if(input[j][2] === d){
            if(d===1){
              output[input[j][0]] = {}
            }else{
              insertObject(output , input[j][1], input[j][0]);
            }
          }
      }
  }
  return output;
}
function arrayToTree(items ,parent){
  const rootItems = [];
  const lookup = {};
  for (var i in items) {
      var itemId   = items[i][0];
      var parentId = items[i][1];
      if (! lookup[itemId]) lookup[itemId] = {["id"]:itemId, ["children"]: [] }
      const TreeItem = lookup[itemId];
      if (parentId === parent ) {
          rootItems.push(TreeItem);
      }
      else {
          if (! lookup[parentId]) lookup[parentId] = { ["children"]: [] };
          lookup[parentId]["children"].push(TreeItem);
      }
  }
  return rootItems;
}
 function start1(){
   console.log("From getObject func() ");console.log(getObject(input,0,{}));
   console.log("From arrayToTree() ");console.log(arrayToTree(input,0));
    console.log("From depthWise()  ");console.log( depthWise(input,{}));
}
