

function doStore(key,value){
	var saveList = store.get('saveList');
	var saveListObject = store.get('saveListObject');
	var now = new Date();
	var time = now.getTime();
	var dataTiem = now.toLocaleString();
	
	//console.log(time);
	//console.log(dataTiem);
	
	//console.log(saveList);
	//console.log(saveListObject);
	///
	if(!saveList){
		saveList = {};
	}
	if(!saveListObject){
		saveListObject = [];
	}
	
	saveList[time] = dataTiem;
	saveListObject[time] = value;
	
	store.set('saveList',saveList);
	store.set('saveListObject',saveListObject);
	
	//1455162659878
	//store.remove('saveListObject')
	//store.get('1455162659878')
}
