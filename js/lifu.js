/**
 * @author 暖宝宝
 */

/**
 * 获取职业生产树
 * @param {Object} job
 */
function makeJobTreeData(job){
	
}

function getItemTree(id) {
	var item = makeLis["_" + id];
	var peifang = item["pf"];
	peifang = newPeiFangObject(peifang, 0);
	var children1 = [{
		id: "it_" + id,
		text: item["name"],
		expanded: true,
		children: peifang
	}];
	return children1;
}

function makeTreeItem(id,showJob,expanded) {
	var newid = id.substring(id.indexOf("_"));
	//console.log("id = "+id+" newid = "+newid);
	var item = makeLis[newid];
	var peifang = item["pf"];
	peifang = newPeiFangObject(peifang, 0);
	var children1 = {
		id: id,
		text: item["name"]+ (showJob ? " ["+item["job"]+" : "+item["lv"]+"]" : ""),
		expanded: expanded,
		nodeType: "itemNode",
		children: peifang
	};
	//console.log(children1);
	return children1;
}
/**
 * 获取理符tree 数据
 * @param {Object} job
 */
function makeLiTreeData(job,lv1,lv2,place) {
	if (!jobList[job]) {
		return [];
	}

	var lifus = [];
	for (var i = 0; i < missons.length; i++) {
		var lv = parseFloat(missons[i]["lv"]);
		if ((missons[i]["job"] == job || job == "all") && (lv >= lv1 && lv <= lv2) && ( place == "all" || missons[i]["place"] == place)) {
			//console.log(missons[i]["misson"]);
			//lifus.pu
			var tem = missons[i];
			tem["nodeType"] = "misson";
			tem["expanded"] = true;
			tem["id"] = "li_" + tem["it_id"];
			tem["text"] = "<font color=blue>" + tem["lv"] + "级</font>  <font color=green>" + tem["misson"] + "</font> [ <font color=red>" + tem["place"] + "</font> ]"
			var item = makeLis["_" + tem["it_id"]];
			var peifang = item["pf"];
			
			//peifang = getPeifang(peifang);
			peifang = newPeiFangObject(peifang,0);
			console.log(item["name"]+"的配方");
			console.log(peifang);
			
			var children1 = [{
				id: "it_" + tem["it_id"],
				text: item["name"]+" x"+missons[i]["it_no"],
				expanded: false,
				children: peifang
			}];
			tem["children"] = children1;

			//console.log(tem)
			lifus.push(tem);
		}
	}
	//console.log(lifus);
	return lifus;
}

function newPeiFangObject(peifang,index){
	var ss = newNode(peifang.length);
	//一级物品配方（任务物品配方）
	for (var j = 0; j < peifang.length; j++) {
		ss[j]["id"] = randomString(4)+"_"+peifang[j]["id"];
		ss[j]["text"] = peifang[j]["memo"];
		ss[j]["name"] = peifang[j]["name"];
		ss[j]["no"] = peifang[j]["no"];
		ss[j]["nodeType"] = "pf_"+index;
		ss[j]["job"] = peifang[j]["job"];
		//console.log(peifang[j]["name"]+" job = "+peifang[j]["job"]+" id = "+peifang[j]["id"])
		if (peifang[j]["job"] != "") {
			var iid = "_"+peifang[j]["id"];
			var item0 = makeLis[iid];
			if(item0){
				ss[j]["children"] = newPeiFangObject(item0["pf"],index+1);
			}
		}
	}
	return ss;
}

function newNode(len){
	var ss = [];
	for(var i=0;i<len;i++){
		ss.push({id:"",text:"",nodeType:"",job:"",name:"",children:[]});
	}
	return ss;
}

var ItObject = function(item){
	this.id = randomString(5)+"_"+item["id"];
	this.name = item["name"];
	this.job = item["job"];
	this.lv = item["lv"];
	this.type = item["type"];
	this.pf = item["pf"];
	this.sj = item["sj"];
	this.img = item["img"];
	this.lifu = item["lifu"];
}

var PfObjects = function(pf){
	var re = [];
	for (var k = 0; k < pf.length; k++) {
		console.log(pf[k]);
		re.push(new PfObject(pf[k]));
	}
	return re;
}

var PfObject = function(pf){
	this.id = randomString(5)+"_"+pf["id"];
	this.name = pf["name"]; 
	this.memo = pf["memo"]; 
	this.job = pf["job"];
	this.no = pf["no"];
}

/**
 * 获取生产配方，最高4级
 * @param {Object} peifang
 */
function getPeifang(peifang) {
	//一级物品配方（任务物品配方）
	for (var j = 0; j < peifang.length; j++) {
		
		peifang[j]["text"] = "<0>"+peifang[j]["memo"];
		peifang[j]["nodeType"] = "pf_0";
		//console.log(peifang[j]["name"]+" job = "+peifang[j]["job"]+" id = "+peifang[j]["id"])
		if (peifang[j]["job"] != "") {
			var item1 = makeLis["_" + peifang[j]["id"]];
			console.log(item1);
			if (item1) {
				//console.log(item1)
				//console.log(peifang[j]["name"]+" 有生产配方");
				var pc_pf = item1["pf"];

				//二级物品配方
				for (var k = 0; k < pc_pf.length; k++) {
					
					pc_pf[k]["text"] = "<1>"+pc_pf[k]["memo"];
					peifang[j]["expanded"] = true; //父节点 
					pc_pf[k]["nodeType"] = "pf_1";

					if (pc_pf[k]["job"] != "") {
						var item2 = makeLis["_" + pc_pf[k]["id"]];
						if (item2) {
							var pc_pf_pf = item2["pf"];
							//三级物品配方
							for (var l = 0; l < pc_pf_pf.length; l++) {
								
								pc_pf_pf[l]["text"] = "<2>"+pc_pf_pf[l]["memo"];
								//pc_pf[k]["expanded"] = true;//父节点
								pc_pf_pf[l]["nodeType"] = "pf_2";

								if (pc_pf_pf[l]["job"] != "") {
									var item3 = makeLis["_" + pc_pf_pf[l]["id"]];
									if (item3) {
										var pc_pf_pf_pf = item3["pf"];
										//四级配方
										for (var m = 0; m < pc_pf_pf_pf.length; m++) {
											pc_pf_pf_pf[m]["text"] = "<3>"+pc_pf_pf_pf[m]["memo"];
											//pc_pf_pf[l]["expanded"] = true;//父节点
											//console.log(pc_pf_pf_pf[m]["name"]+" 是4级生产配方 ");
											pc_pf_pf_pf[m]["nodeType"] = "pf_3";
											pc_pf_pf_pf[m]["id"] = pc_pf_pf_pf[m]["id"]+"_"+randomString(5);
										}
									}
								}
								pc_pf_pf[l]["id"] = pc_pf_pf[l]["id"]+"_"+randomString(4);
								console.log('pc_pf_pf['+l+']["id"] = '+pc_pf_pf[l]["id"])
							}
							pc_pf[k]["children"] = pc_pf_pf;
						}
					}
					pc_pf[k]["id"] = pc_pf[k]["id"]+"_"+randomString(3);
				}
				peifang[j]["children"] = pc_pf;

			}
		}
		peifang[j]["id"] = peifang[j]["id"]+"_"+randomString(2);
	}
	return peifang;
}

var randomString = function(len) {
　　len = len || 32;
　　var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijgklmnopqrstuvwxyz0123456789";
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

var missons_ = [
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"30654ce2f28",it_no:"1",place:"格里达尼亚",it_memo:"梣木根杖 x 1",misson:"制作委托：廉价的木制幻具"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"767f5be7c2d",it_no:"1",place:"格里达尼亚",it_memo:"砂岩砂轮机 x 1",misson:"制作委托：面向雕金匠的制作工具"},
{type:"筹集委托",lv:"10",job:"刻木匠",it_id:"cd9eb7e6c94",it_no:"1",place:"弯枝牧场",it_memo:"梣木木材 x 1",misson:"筹集委托：栅栏建材"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"c0b3a710777",it_no:"1",place:"弯枝牧场",it_memo:"犬牙渔枪 x 1",misson:"制作委托：用于捐献的长枪"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"be3c74021f1",it_no:"1",place:"弯枝牧场",it_memo:"梣木纺车 x 1",misson:"制作委托：牧场用的裁缝工具"}
]

var missons = [
{type:"制作委托",lv:"1",job:"刻木匠",it_id:"47d6c9c9bf3",it_no:"1",place:"格里达尼亚",it_memo:"兽骨渔枪 x 1",misson:"制作委托：双蛇党用于训练的长枪"},
{type:"制作委托",lv:"1",job:"刻木匠",it_id:"84578d84bfe",it_no:"1",place:"格里达尼亚",it_memo:"枫木木鞋 x 1",misson:"制作委托：廉价的木靴"},
{type:"制作委托",lv:"1",job:"刻木匠",it_id:"8efbe3bd7ec",it_no:"1",place:"烤饼练兵所",it_memo:"枫木短弓 x 1",misson:"制作委托：新手斥候用的短弓"},
{type:"制作委托",lv:"1",job:"刻木匠",it_id:"af04edbaf84",it_no:"1",place:"烤饼练兵所",it_memo:"枫木方盾 x 1",misson:"制作委托：新手卫兵用的木盾"},
{type:"制作委托",lv:"5",job:"刻木匠",it_id:"f4bcbc79477",it_no:"1",place:"格里达尼亚",it_memo:"枫木长弓 x 1",misson:"制作委托：双蛇党用于训练的长弓"},
{type:"制作委托",lv:"5",job:"刻木匠",it_id:"9721427477b",it_no:"1",place:"格里达尼亚",it_memo:"圆盾 x 1",misson:"制作委托：冒险者用的木盾"},
{type:"筹集委托",lv:"5",job:"刻木匠",it_id:"8f4128a3d64",it_no:"1",place:"烤饼练兵所",it_memo:"枫木手杖 x 1",misson:"筹集委托：新手卫生兵用的幻具"},
{type:"制作委托",lv:"5",job:"刻木匠",it_id:"a527b2cf083",it_no:"1",place:"烤饼练兵所",it_memo:"青铜长枪 x 1",misson:"制作委托：用于新兵训练的长枪"},
{type:"制作委托",lv:"5",job:"刻木匠",it_id:"0cdf666234e",it_no:"1",place:"烤饼练兵所",it_memo:"梣木石刃棒 x 1",misson:"制作委托：用于模拟战的木剑"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"30654ce2f28",it_no:"1",place:"格里达尼亚",it_memo:"梣木根杖 x 1",misson:"制作委托：廉价的木制幻具"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"767f5be7c2d",it_no:"1",place:"格里达尼亚",it_memo:"砂岩砂轮机 x 1",misson:"制作委托：面向雕金匠的制作工具"},
{type:"筹集委托",lv:"10",job:"刻木匠",it_id:"cd9eb7e6c94",it_no:"1",place:"弯枝牧场",it_memo:"梣木木材 x 1",misson:"筹集委托：栅栏建材"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"c0b3a710777",it_no:"1",place:"弯枝牧场",it_memo:"犬牙渔枪 x 1",misson:"制作委托：用于捐献的长枪"},
{type:"制作委托",lv:"10",job:"刻木匠",it_id:"be3c74021f1",it_no:"1",place:"弯枝牧场",it_memo:"梣木纺车 x 1",misson:"制作委托：牧场用的裁缝工具"},
{type:"制作委托",lv:"15",job:"刻木匠",it_id:"edc27134c67",it_no:"1",place:"格里达尼亚",it_memo:"黑铁长枪 x 1",misson:"制作委托：铁制长枪"},
{type:"制作委托",lv:"15",job:"刻木匠",it_id:"9eb2ebe7b55",it_no:"1",place:"格里达尼亚",it_memo:"榆木牧杖 x 1",misson:"制作委托：榆木制幻具"},
{type:"筹集委托",lv:"15",job:"刻木匠",it_id:"8e59cd755d8",it_no:"1",place:"霍桑山寨",it_memo:"榆木木材 x 1",misson:"筹集委托：哨塔建材"},
{type:"制作委托",lv:"15",job:"刻木匠",it_id:"2fee071d2ba",it_no:"1",place:"霍桑山寨",it_memo:"梣木假面（天青石） x 1",misson:"制作委托：提供给鬼哭队的面具"},
{type:"制作委托",lv:"15",job:"刻木匠",it_id:"a1328f332f3",it_no:"1",place:"霍桑山寨",it_memo:"梣木方盾 x 1",misson:"制作委托：面向冒险者的木盾"},
{type:"制作委托",lv:"20",job:"刻木匠",it_id:"aaa0433f0b9",it_no:"1",place:"格里达尼亚",it_memo:"紫杉根杖 x 1",misson:"制作委托：紫杉制幻具"},
{type:"批发委托",lv:"20",job:"刻木匠",it_id:"2fee071d2ba",it_no:"3",place:"格里达尼亚",it_memo:"梣木假面（天青石） x 3",misson:"批发委托：提供给鬼哭队的假面"},
{type:"筹集委托",lv:"20",job:"刻木匠",it_id:"51a0aadec7b",it_no:"1",place:"石场水车",it_memo:"黑铁骑枪 x 1",misson:"筹集委托：面向义勇兵的长枪"},
{type:"制作委托",lv:"20",job:"刻木匠",it_id:"385fb7caee4",it_no:"1",place:"石场水车",it_memo:"泥岩砂轮机 x 1",misson:"制作委托：打磨武具用的砂轮"},
{type:"批发委托",lv:"20",job:"刻木匠",it_id:"edc27134c67",it_no:"3",place:"石场水车",it_memo:"黑铁长枪 x 3",misson:"批发委托：研究新的防卫对策"},
{type:"制作委托",lv:"25",job:"刻木匠",it_id:"2f5fa598878",it_no:"1",place:"格里达尼亚",it_memo:"蛇纹圆盾 x 1",misson:"制作委托：白蛇花纹的圆盾"},
{type:"筹集委托",lv:"25",job:"刻木匠",it_id:"8a61c37f533",it_no:"1",place:"石场水车",it_memo:"白银战叉 x 1",misson:"筹集委托：银色光辉的战叉"},
{type:"批发委托",lv:"25",job:"刻木匠",it_id:"3f9bd918147",it_no:"3",place:"格里达尼亚",it_memo:"胡桃木材 x 3",misson:"批发委托：高级家具用的木材"},
{type:"制作委托",lv:"25",job:"刻木匠",it_id:"af1ed8baf17",it_no:"1",place:"石场水车",it_memo:"榆木石刃棒 x 1",misson:"制作委托：训练义勇兵用的木剑"},
{type:"制作委托",lv:"25",job:"刻木匠",it_id:"dd2ac714bee",it_no:"1",place:"格里达尼亚",it_memo:"白钢长枪 x 1",misson:"制作委托：提供给鬼哭队的长枪"},
{type:"批发委托",lv:"25",job:"刻木匠",it_id:"06c68550284",it_no:"3",place:"石场水车",it_memo:"紫杉手杖 x 3",misson:"批发委托：面向义勇兵的幻具"},
{type:"筹集委托",lv:"30",job:"刻木匠",it_id:"dfdd1cfaaf2",it_no:"1",place:"太阳海岸",it_memo:"胡桃石刃棒 x 1",misson:"筹集委托：送礼用的木剑"},
{type:"品质指定",lv:"30",job:"刻木匠",it_id:"a449fb14288",it_no:"1",place:"格里达尼亚",it_memo:"梣木骑兵弓 x 1",misson:"品质指定：用于竞技大会奖励的弓"},
{type:"批发委托",lv:"30",job:"刻木匠",it_id:"dd2ac714bee",it_no:"3",place:"格里达尼亚",it_memo:"白钢长枪 x 3",misson:"批发委托：仪式典礼用的长枪"},
{type:"制作委托",lv:"30",job:"刻木匠",it_id:"0542648df06",it_no:"1",place:"太阳海岸",it_memo:"白钢重骑枪 x 1",misson:"制作委托：老手佣兵用的长枪"},
{type:"批发委托",lv:"30",job:"刻木匠",it_id:"fbbc25205ce",it_no:"3",place:"太阳海岸",it_memo:"黑铁战戟 x 3",misson:"批发委托：捐赠给黑涡团的长枪"},
{type:"筹集委托",lv:"35",job:"刻木匠",it_id:"927bb49c2ef",it_no:"1",place:"阿德内尔占星台",it_memo:"蟹甲渔枪 x 1",misson:"筹集委托：格里达尼亚风格的长枪"},
{type:"制作委托",lv:"35",job:"刻木匠",it_id:"cf1d7c745de",it_no:"1",place:"格里达尼亚",it_memo:"铜铃橡木牧杖 x 1",misson:"制作委托：橡木制幻杖"},
{type:"批发委托",lv:"35",job:"刻木匠",it_id:"dfdd1cfaaf2",it_no:"3",place:"格里达尼亚",it_memo:"胡桃石刃棒 x 3",misson:"批发委托：古色古香的木剑"},
{type:"制作委托",lv:"35",job:"刻木匠",it_id:"05508d7abc3",it_no:"1",place:"阿德内尔占星台",it_memo:"橡木木鞋 x 1",misson:"制作委托：面向酷寒地带的木靴"},
{type:"批发委托",lv:"35",job:"刻木匠",it_id:"a449fb14288",it_no:"3",place:"阿德内尔占星台",it_memo:"梣木骑兵弓 x 3",misson:"批发委托：面向狄兰达尔家的弓"},
{type:"筹集委托",lv:"40",job:"刻木匠",it_id:"f0f52348b2b",it_no:"1",place:"白云崖前哨",it_memo:"钴铁战戟 x 1",misson:"筹集委托：面向骑兵团的战戟"},
{type:"制作委托",lv:"40",job:"刻木匠",it_id:"b9ba903dda2",it_no:"1",place:"格里达尼亚",it_memo:"翡翠手杖 x 1",misson:"制作委托：镶嵌了翡翠的幻杖"},
{type:"批发委托",lv:"40",job:"刻木匠",it_id:"3aca559499a",it_no:"3",place:"格里达尼亚",it_memo:"红木纺车 x 3",misson:"批发委托：出口用的纺车"},
{type:"制作委托",lv:"40",job:"刻木匠",it_id:"03785da9f3d",it_no:"1",place:"白云崖前哨",it_memo:"宝石砂轮机 x 1",misson:"制作委托：面向骑兵团的砂轮"},
{type:"批发委托",lv:"40",job:"刻木匠",it_id:"fe9f4fdaef4",it_no:"3",place:"白云崖前哨",it_memo:"秘银骑枪 x 3",misson:"批发委托：面向骑兵团的骑枪"},
{type:"筹集委托",lv:"45",job:"刻木匠",it_id:"64514fad2fa",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"三尖枪 x 1",misson:"筹集委托：清除水晶的工具"},
{type:"制作委托",lv:"45",job:"刻木匠",it_id:"c9584bf1fbb",it_no:"1",place:"格里达尼亚",it_memo:"红木木鞋 x 1",misson:"制作委托：美女留下的木靴"},
{type:"批发委托",lv:"45",job:"刻木匠",it_id:"7ed157640d2",it_no:"5",place:"格里达尼亚",it_memo:"红木木材 x 5",misson:"批发委托：高级家具用的木材"},
{type:"制作委托",lv:"45",job:"刻木匠",it_id:"3ef2d7a3ca5",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"紫杉长弓 x 1",misson:"制作委托：面向佣兵的弓"},
{type:"批发委托",lv:"45",job:"刻木匠",it_id:"b9ba903dda2",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"翡翠手杖 x 3",misson:"批发委托：验证古代魔法用的咒杖"},
{type:"制作委托",lv:"1",job:"锻铁匠",it_id:"78ced078d0c",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜手斧 x 1",misson:"制作委托：出口用的手斧"},
{type:"制作委托",lv:"1",job:"锻铁匠",it_id:"ba7b835e608",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜锭 x 1",misson:"制作委托：库存用的铜铸锭（锻铁匠）"},
{type:"制作委托",lv:"1",job:"锻铁匠",it_id:"14a97dcf55e",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜战斧 x 1",misson:"制作委托：自卫用的斧头"},
{type:"制作委托",lv:"1",job:"锻铁匠",it_id:"b3c0f8200cc",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜手锯 x 1",misson:"制作委托：伐木用的手锯"},
{type:"制作委托",lv:"5",job:"锻铁匠",it_id:"adb718e9cb7",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"业余厨刀 x 1",misson:"制作委托：面向初学者的菜刀"},
{type:"制作委托",lv:"5",job:"锻铁匠",it_id:"46cd753f52b",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜维京剑 x 1",misson:"制作委托：人气剑斗士的爱剑"},
{type:"筹集委托",lv:"5",job:"锻铁匠",it_id:"353ab7a9be2",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜裁皮刀 x 1",misson:"筹集委托：加工皮革用的裁皮刀"},
{type:"制作委托",lv:"5",job:"锻铁匠",it_id:"4493efe4993",it_no:"1",place:"赤血雄鸡农场",it_memo:"业余研钵 x 1",misson:"制作委托：调配农药用的研钵"},
{type:"制作委托",lv:"5",job:"锻铁匠",it_id:"51a142563fc",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜雕金锤 x 1",misson:"制作委托：保养风车用的锤子"},
{type:"制作委托",lv:"10",job:"锻铁匠",it_id:"f5b2e1a86ba",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"业余横头锤 x 1",misson:"制作委托：面向初学者的锻铁工具"},
{type:"制作委托",lv:"10",job:"锻铁匠",it_id:"14b01cf8c63",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜骑兵剑 x 1",misson:"制作委托：出口用的骑兵剑"},
{type:"筹集委托",lv:"10",job:"锻铁匠",it_id:"30cd82fee42",it_no:"1",place:"雨燕塔殖民地",it_memo:"青铜指虎 x 1",misson:"筹集委托：用于在乌尔达哈卖的武器"},
{type:"制作委托",lv:"10",job:"锻铁匠",it_id:"0252c274fd5",it_no:"1",place:"雨燕塔殖民地",it_memo:"业余雕金锤 x 1",misson:"制作委托：用于在乌尔达哈卖的工具"},
{type:"制作委托",lv:"10",job:"锻铁匠",it_id:"40e4533b9dc",it_no:"1",place:"雨燕塔殖民地",it_memo:"黄铜裁皮刀 x 1",misson:"制作委托：用于在格里达尼亚卖的工具"},
{type:"制作委托",lv:"15",job:"锻铁匠",it_id:"a31d0a708d9",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁锭 x 1",misson:"制作委托：出口用的铁锭"},
{type:"制作委托",lv:"15",job:"锻铁匠",it_id:"ccca4a31e2c",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁平斩 x 1",misson:"制作委托：出口用的制革工具"},
{type:"筹集委托",lv:"15",job:"锻铁匠",it_id:"168c0c69e15",it_no:"1",place:"小麦酒港",it_memo:"黑铁铆钉 x 1",misson:"筹集委托：商船的零部件"},
{type:"制作委托",lv:"15",job:"锻铁匠",it_id:"7f19ea3fc07",it_no:"1",place:"小麦酒港",it_memo:"黄铜指虎 x 1",misson:"制作委托：用于贸易的格斗武器"},
{type:"制作委托",lv:"15",job:"锻铁匠",it_id:"ad84d4cfc04",it_no:"1",place:"小麦酒港",it_memo:"新来者裁皮刀 x 1",misson:"制作委托：交易用制革工具"},
{type:"制作委托",lv:"20",job:"锻铁匠",it_id:"78613f6529c",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁鹤嘴锄 x 1",misson:"制作委托：出口用的采矿工具"},
{type:"批发委托",lv:"20",job:"锻铁匠",it_id:"39e0ca5a212",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"黑铁羊角锤 x 3",misson:"批发委托：面向刻木匠行会的锤子"},
{type:"筹集委托",lv:"20",job:"锻铁匠",it_id:"afbebc06a4f",it_no:"1",place:"石场水车",it_memo:"黑铁碎石锤 x 1",misson:"筹集委托：用于调集石材的碎石锤"},
{type:"制作委托",lv:"20",job:"锻铁匠",it_id:"7f5e15562e9",it_no:"1",place:"石场水车",it_memo:"新来者手锯 x 1",misson:"制作委托：用于木工活的手锯"},
{type:"批发委托",lv:"20",job:"锻铁匠",it_id:"513e9fe7e3f",it_no:"3",place:"石场水车",it_memo:"黄铜维京剑 x 3",misson:"批发委托：义勇兵用的单手剑"},
{type:"制作委托",lv:"25",job:"锻铁匠",it_id:"5c219bc9ee7",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁装饰锤 x 1",misson:"制作委托：面向中级工匠的雕金工具"},
{type:"筹集委托",lv:"25",job:"锻铁匠",it_id:"8c551593ebd",it_no:"1",place:"石场水车",it_memo:"黑铁短剑 x 1",misson:"筹集委托：护身用的短剑"},
{type:"批发委托",lv:"25",job:"锻铁匠",it_id:"4f523fd672f",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"黑铁圆革刀 x 3",misson:"批发委托：面向制革匠行会的裁皮刀"},
{type:"制作委托",lv:"25",job:"锻铁匠",it_id:"f2e1f3ffaf3",it_no:"1",place:"石场水车",it_memo:"黑铁鸟嘴锤 x 1",misson:"制作委托：整备武具用的工具"},
{type:"批发委托",lv:"25",job:"锻铁匠",it_id:"8f4e32d32f1",it_no:"3",place:"石场水车",it_memo:"新来者研钵 x 3",misson:"批发委托：调配药物用的研钵"},
{type:"筹集委托",lv:"30",job:"锻铁匠",it_id:"88333940b11",it_no:"1",place:"太阳海岸",it_memo:"白钢弯刃刀 x 1",misson:"筹集委托：剑舞用的黑铁弯刃刀"},
{type:"制作委托",lv:"30",job:"锻铁匠",it_id:"7a31f63bd05",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"白钢雕纹手锯 x 1",misson:"制作委托：刻木品评会的奖品"},
{type:"批发委托",lv:"30",job:"锻铁匠",it_id:"964cfa97979",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"白钢鹤嘴镐 x 3",misson:"批发委托：面向矿山公司的采矿工具"},
{type:"制作委托",lv:"30",job:"锻铁匠",it_id:"2e7ea3e8e66",it_no:"1",place:"太阳海岸",it_memo:"白钢碎石锤 x 1",misson:"制作委托：取椰子用的锤子"},
{type:"批发委托",lv:"30",job:"锻铁匠",it_id:"66ed70f6ecf",it_no:"3",place:"太阳海岸",it_memo:"白钢镰刀 x 3",misson:"批发委托：用于园艺的割草镰刀"},
{type:"筹集委托",lv:"35",job:"锻铁匠",it_id:"6a2aa2369bd",it_no:"1",place:"阿德内尔占星台",it_memo:"秘银宽刃剑 x 1",misson:"筹集委托：护身用的秘银匕首"},
{type:"制作委托",lv:"35",job:"锻铁匠",it_id:"713f03d54da",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"革柄白钢平斩 x 1",misson:"制作委托：老练制革匠用的平斩"},
{type:"批发委托",lv:"35",job:"锻铁匠",it_id:"e749b94fe53",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"重钢研钵 x 3",misson:"批发委托：面向七贤堂的研钵"},
{type:"制作委托",lv:"35",job:"锻铁匠",it_id:"82d2a3b28e3",it_no:"1",place:"阿德内尔占星台",it_memo:"白钢圆革刀 x 1",misson:"制作委托：加工毛皮用的圆革刀"},
{type:"批发委托",lv:"35",job:"锻铁匠",it_id:"57ef0e9b572",it_no:"3",place:"阿德内尔占星台",it_memo:"革柄白钢厨刀 x 3",misson:"批发委托：库存用的菜刀"},
{type:"筹集委托",lv:"40",job:"锻铁匠",it_id:"6231c484ebd",it_no:"1",place:"白云崖前哨",it_memo:"秘银碎石锤 x 1",misson:"筹集委托：破碎用的碎石锤"},
{type:"制作委托",lv:"40",job:"锻铁匠",it_id:"0571dc06db1",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"秘银手钳 x 1",misson:"制作委托：出口用的手钳"},
{type:"批发委托",lv:"40",job:"锻铁匠",it_id:"52f18622dd5",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"秘银锉刀 x 3",misson:"批发委托：制造舰载炮的工具"},
{type:"制作委托",lv:"40",job:"锻铁匠",it_id:"ff0a7fcae9e",it_no:"1",place:"白云崖前哨",it_memo:"钴铁铸甲锤 x 1",misson:"制作委托：铸甲工匠用的锤子"},
{type:"批发委托",lv:"40",job:"锻铁匠",it_id:"d27ab18ed9d",it_no:"3",place:"白云崖前哨",it_memo:"秘银羊角锤 x 3",misson:"批发委托：组装攻城兵器的工具"},
{type:"筹集委托",lv:"45",job:"锻铁匠",it_id:"145ef41c0a1",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"绿金裁皮刀 x 1",misson:"筹集委托：挖掘用的裁皮刀"},
{type:"制作委托",lv:"45",job:"锻铁匠",it_id:"bda06754c8f",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"钴铁锉刀 x 1",misson:"制作委托：面向老练冒险者的金属锉刀"},
{type:"批发委托",lv:"45",job:"锻铁匠",it_id:"193ffe98a9a",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"钴铁手钳 x 3",misson:"批发委托：面向库尔札斯的手钳"},
{type:"制作委托",lv:"45",job:"锻铁匠",it_id:"deb78426d5b",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"钴铁羊角锤 x 1",misson:"制作委托：面向挖掘调查队的木匠工具"},
{type:"批发委托",lv:"45",job:"锻铁匠",it_id:"37886368faa",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"钴铁碎石锤 x 3",misson:"批发委托：碎水晶用的碎石锤"},
{type:"制作委托",lv:"1",job:"铸甲匠",it_id:"ba7b835e608",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜锭 x 1",misson:"制作委托：库存用的铜铸锭（铸甲匠）"},
{type:"制作委托",lv:"1",job:"铸甲匠",it_id:"928a9b10d1d",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜平底锅 x 1",misson:"制作委托：面对初学者的平底锅"},
{type:"制作委托",lv:"1",job:"铸甲匠",it_id:"3ae8413756e",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜铆钉 x 1",misson:"制作委托：青铜铆钉（铸甲匠）"},
{type:"制作委托",lv:"1",job:"铸甲匠",it_id:"9a40666c149",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜重盾 x 1",misson:"制作委托：自卫用的盾"},
{type:"制作委托",lv:"5",job:"铸甲匠",it_id:"bb7235c9775",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜锁子铠 x 1",misson:"制作委托：出口用的链甲"},
{type:"制作委托",lv:"5",job:"铸甲匠",it_id:"2e4cc836f50",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"红铜开面盔 x 1",misson:"制作委托：面向斧术师行会的头盔"},
{type:"筹集委托",lv:"5",job:"铸甲匠",it_id:"5cfeba85a67",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜角盔 x 1",misson:"筹集委托：自卫用的头盔"},
{type:"制作委托",lv:"5",job:"铸甲匠",it_id:"1501bd4ac03",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜锁甲靴 x 1",misson:"制作委托：自卫用的锁甲靴"},
{type:"制作委托",lv:"5",job:"铸甲匠",it_id:"3ffe628a2e3",it_no:"1",place:"赤血雄鸡农场",it_memo:"青铜步兵盾 x 1",misson:"制作委托：路障盾"},
{type:"制作委托",lv:"10",job:"铸甲匠",it_id:"716a6423600",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"青铜护腰带 x 1",misson:"制作委托：面向骑兵的腰带"},
{type:"制作委托",lv:"10",job:"铸甲匠",it_id:"a83cf15573c",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁平底锅 x 1",misson:"制作委托：煎蛋用的平底锅"},
{type:"筹集委托",lv:"10",job:"铸甲匠",it_id:"eda9833fcae",it_no:"1",place:"雨燕塔殖民地",it_memo:"青铜铠靴 x 1",misson:"筹集委托：用于在乌尔达哈卖的锁甲靴"},
{type:"制作委托",lv:"10",job:"铸甲匠",it_id:"a66cc00a3a6",it_no:"1",place:"雨燕塔殖民地",it_memo:"业余平底锅 x 1",misson:"制作委托：用于在乌尔达哈卖的烹调工具"},
{type:"制作委托",lv:"10",job:"铸甲匠",it_id:"b704b54fcac",it_no:"1",place:"雨燕塔殖民地",it_memo:"黄铜蒸馏器 x 1",misson:"制作委托：用于在乌尔达哈卖的蒸馏器"},
{type:"制作委托",lv:"15",job:"铸甲匠",it_id:"414e89ae5f9",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黄铜开面盔 x 1",misson:"制作委托：面向斧术师的头盔"},
{type:"制作委托",lv:"15",job:"铸甲匠",it_id:"e0809678a9b",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁胸甲 x 1",misson:"制作委托：出口用的板金铠"},
{type:"筹集委托",lv:"15",job:"铸甲匠",it_id:"a3f7b4db49c",it_no:"1",place:"小麦酒港",it_memo:"新来者平底锅 x 1",misson:"筹集委托：面向船员的烹调工具"},
{type:"制作委托",lv:"15",job:"铸甲匠",it_id:"47c928b0ccb",it_no:"1",place:"小麦酒港",it_memo:"黑铁重盾 x 1",misson:"制作委托：船上战斗用的圆盾"},
{type:"制作委托",lv:"15",job:"铸甲匠",it_id:"bd7af99d3d9",it_no:"1",place:"小麦酒港",it_memo:"黑铁手铠 x 1",misson:"制作委托：船上战斗用的手铠"},
{type:"制作委托",lv:"20",job:"铸甲匠",it_id:"95275db45ac",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"黑铁机关盾 x 1",misson:"制作委托：巡夜用的机关盾"},
{type:"批发委托",lv:"20",job:"铸甲匠",it_id:"e3034164328",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"镶铁小圆盾 x 3",misson:"批发委托：面向角斗士武器百货的圆盾"},
{type:"筹集委托",lv:"20",job:"铸甲匠",it_id:"82f32b5d059",it_no:"1",place:"石场水车",it_memo:"黑铁煎锅 x 1",misson:"筹集委托：替换用的煎锅"},
{type:"制作委托",lv:"20",job:"铸甲匠",it_id:"29c9fa25677",it_no:"1",place:"石场水车",it_memo:"黑铁臂甲 x 1",misson:"制作委托：面向义勇兵的手铠"},
{type:"批发委托",lv:"20",job:"铸甲匠",it_id:"d60cfad87a6",it_no:"3",place:"石场水车",it_memo:"黑铁头盔 x 3",misson:"批发委托：面向义勇兵的金属头盔"},
{type:"制作委托",lv:"25",job:"铸甲匠",it_id:"c75db0a8725",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"白钢锭 x 1",misson:"制作委托：出口用的白钢铸锭"},
{type:"筹集委托",lv:"25",job:"铸甲匠",it_id:"e8e728c0a2a",it_no:"1",place:"石场水车",it_memo:"黑铁重足铠 x 1",misson:"筹集委托：面向义勇兵的锁甲靴"},
{type:"批发委托",lv:"25",job:"铸甲匠",it_id:"75ee092f7f2",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"白钢腰甲 x 3",misson:"批发委托：面向福尔唐家族的腰甲"},
{type:"制作委托",lv:"25",job:"铸甲匠",it_id:"6575a360d51",it_no:"1",place:"石场水车",it_memo:"特制蒸馏器 x 1",misson:"制作委托：调配药物用的蒸馏器"},
{type:"批发委托",lv:"25",job:"铸甲匠",it_id:"c4aec3a06fd",it_no:"3",place:"石场水车",it_memo:"白钢链甲 x 3",misson:"批发委托：面向义勇兵的链甲"},
{type:"筹集委托",lv:"30",job:"铸甲匠",it_id:"428798cb86d",it_no:"1",place:"太阳海岸",it_memo:"镶银小圆盾 x 1",misson:"筹集委托：赠给剑斗士的装饰盾"},
{type:"制作委托",lv:"30",job:"铸甲匠",it_id:"5a17c4bd7c6",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"公牛重盾 x 1",misson:"制作委托：猛牛花纹的圆盾"},
{type:"批发委托",lv:"30",job:"铸甲匠",it_id:"63d9edbacc4",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"白钢长筒靴 x 3",misson:"批发委托：大量的长筒靴"},
{type:"制作委托",lv:"30",job:"铸甲匠",it_id:"e107021c576",it_no:"1",place:"太阳海岸",it_memo:"白钢骑兵头盔 x 1",misson:"制作委托：小猫咪的头盔"},
{type:"批发委托",lv:"30",job:"铸甲匠",it_id:"f9e73c92a39",it_no:"3",place:"太阳海岸",it_memo:"白钢铠靴 x 3",misson:"批发委托：老手佣兵用的锁甲靴"},
{type:"筹集委托",lv:"35",job:"铸甲匠",it_id:"68cf5c88a93",it_no:"1",place:"阿德内尔占星台",it_memo:"秘银板 x 1",misson:"筹集委托：大型望远镜的零件"},
{type:"制作委托",lv:"35",job:"铸甲匠",it_id:"5eddc1855a4",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"秘银锭 x 1",misson:"制作委托：面向雕金匠的秘银锭"},
{type:"批发委托",lv:"35",job:"铸甲匠",it_id:"2093bc312af",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"白钢重足铠 x 3",misson:"批发委托：面向佣兵的板金铠"},
{type:"制作委托",lv:"35",job:"铸甲匠",it_id:"f81e862f2ab",it_no:"1",place:"阿德内尔占星台",it_memo:"白钢煎锅 x 1",misson:"制作委托：顺手的平底锅"},
{type:"批发委托",lv:"35",job:"铸甲匠",it_id:"f12b7240fc1",it_no:"3",place:"阿德内尔占星台",it_memo:"白钢战靴 x 3",misson:"批发委托：面向骑兵团的战靴"},
{type:"筹集委托",lv:"40",job:"铸甲匠",it_id:"8928b474567",it_no:"1",place:"白云崖前哨",it_memo:"秘银锁甲头罩 x 1",misson:"筹集委托：面向骑兵团的锁甲头罩"},
{type:"制作委托",lv:"40",job:"铸甲匠",it_id:"8e40194d15c",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"秘银长筒靴 x 1",misson:"制作委托：面向剑术师的战靴"},
{type:"批发委托",lv:"40",job:"铸甲匠",it_id:"85face0295e",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"秘银蒸馏器 x 3",misson:"批发委托：面向炼金术士行会的高级蒸馏器"},
{type:"制作委托",lv:"40",job:"铸甲匠",it_id:"349c146cc69",it_no:"1",place:"白云崖前哨",it_memo:"秘银开面盔 x 1",misson:"制作委托：神殿骑士的板金头盔"},
{type:"批发委托",lv:"40",job:"铸甲匠",it_id:"906e786686b",it_no:"3",place:"白云崖前哨",it_memo:"秘银骑兵头盔 x 3",misson:"批发委托：重装骑兵用的板金头盔"},
{type:"筹集委托",lv:"45",job:"铸甲匠",it_id:"7269bfca9d3",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"地狱厨锅 x 1",misson:"筹集委托：调查队员用的平底锅"},
{type:"制作委托",lv:"45",job:"铸甲匠",it_id:"8505d0645a6",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"钴铁板 x 1",misson:"制作委托：前桅塔的建材"},
{type:"批发委托",lv:"45",job:"铸甲匠",it_id:"4b09820432f",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"秘银重甲 x 3",misson:"批发委托：对龙用的板金铠"},
{type:"制作委托",lv:"45",job:"铸甲匠",it_id:"e0b8ba113ae",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"钴铁长筒靴 x 1",misson:"制作委托：调查队员用的长筒靴"},
{type:"批发委托",lv:"45",job:"铸甲匠",it_id:"061c3d4a71a",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"钴铁锭 x 3",misson:"批发委托：修缮文物用的钴铁锭"},
{type:"制作委托",lv:"1",job:"雕金匠",it_id:"aef258f66ef",it_no:"1",place:"乌尔达哈",it_memo:"红铜锭 x 1",misson:"制作委托：不够的红铜铸锭"},
{type:"制作委托",lv:"1",job:"雕金匠",it_id:"712e7211081",it_no:"1",place:"乌尔达哈",it_memo:"红铜手链 x 1",misson:"制作委托：廉价的手链"},
{type:"制作委托",lv:"1",job:"雕金匠",it_id:"3cef17ce92b",it_no:"1",place:"毒蝎交易所",it_memo:"兽骨骨拳 x 1",misson:"制作委托：面向半路出家拳斗士的骨拳"},
{type:"制作委托",lv:"1",job:"雕金匠",it_id:"bb9cb3dd0a3",it_no:"1",place:"毒蝎交易所",it_memo:"兽骨长杖 x 1",misson:"制作委托：伤员用的长杖"},
{type:"制作委托",lv:"5",job:"雕金匠",it_id:"a870683c58d",it_no:"1",place:"乌尔达哈",it_memo:"红铜耳环 x 1",misson:"制作委托：廉价的耳饰"},
{type:"制作委托",lv:"5",job:"雕金匠",it_id:"87efa5aa65b",it_no:"1",place:"乌尔达哈",it_memo:"牡羊角爪 x 1",misson:"制作委托：拳斗士用的爪"},
{type:"筹集委托",lv:"5",job:"雕金匠",it_id:"8ea2fd66656",it_no:"1",place:"毒蝎交易所",it_memo:"兽骨项链 x 1",misson:"筹集委托：诅咒的项链"},
{type:"制作委托",lv:"5",job:"雕金匠",it_id:"96c6e0006a1",it_no:"1",place:"毒蝎交易所",it_memo:"红铜戒指 x 1",misson:"制作委托：用于市场调查的戒指"},
{type:"制作委托",lv:"5",job:"雕金匠",it_id:"89e85928234",it_no:"1",place:"毒蝎交易所",it_memo:"兽骨腕环 x 1",misson:"制作委托：用于市场调查的手镯"},
{type:"制作委托",lv:"10",job:"雕金匠",it_id:"dc456880f47",it_no:"1",place:"乌尔达哈",it_memo:"红铜耳夹 x 1",misson:"制作委托：当红剑斗士的耳饰"},
{type:"制作委托",lv:"10",job:"雕金匠",it_id:"85eb132454d",it_no:"1",place:"乌尔达哈",it_memo:"兽牙耳坠 x 1",misson:"制作委托：护身用的耳饰"},
{type:"筹集委托",lv:"10",job:"雕金匠",it_id:"189ddee6466",it_no:"1",place:"地平关",it_memo:"蟹甲兽骨长杖 x 1",misson:"筹集委托：捐纳用的长杖"},
{type:"制作委托",lv:"10",job:"雕金匠",it_id:"b184ab167dc",it_no:"1",place:"地平关",it_memo:"业余缝针 x 1",misson:"制作委托：作为特别报酬的缝衣针"},
{type:"制作委托",lv:"10",job:"雕金匠",it_id:"cc58a7c3bf3",it_no:"1",place:"地平关",it_memo:"黄铜冲锋项环 x 1",misson:"制作委托：面向铜刃团的护喉甲"},
{type:"制作委托",lv:"15",job:"雕金匠",it_id:"f7e9e62f3cf",it_no:"1",place:"乌尔达哈",it_memo:"黄铜巧匠手链 x 1",misson:"制作委托：面向工匠的手镯"},
{type:"制作委托",lv:"15",job:"雕金匠",it_id:"5bd917ab354",it_no:"1",place:"乌尔达哈",it_memo:"黄铜戒指 x 1",misson:"制作委托：便宜的黄铜戒指"},
{type:"筹集委托",lv:"15",job:"雕金匠",it_id:"96d803cbab5",it_no:"1",place:"枯骨营地",it_memo:"黄铜头冠（日长石） x 1",misson:"筹集委托：随葬用的头冠"},
{type:"制作委托",lv:"15",job:"雕金匠",it_id:"6ad2390f095",it_no:"1",place:"枯骨营地",it_memo:"蝠牙缝针 x 1",misson:"制作委托：修补天蓬用的缝衣针"},
{type:"制作委托",lv:"15",job:"雕金匠",it_id:"8815d1f09d2",it_no:"1",place:"枯骨营地",it_memo:"黄铜巧匠戒指 x 1",misson:"制作委托：金闪闪的戒指"},
{type:"制作委托",lv:"20",job:"雕金匠",it_id:"6db8a32fd6c",it_no:"1",place:"乌尔达哈",it_memo:"白珊瑚戒指 x 1",misson:"制作委托：幸运的珊瑚戒指"},
{type:"批发委托",lv:"20",job:"雕金匠",it_id:"f98c88f6887",it_no:"3",place:"乌尔达哈",it_memo:"黄铜咒杖 x 3",misson:"批发委托：流行的咒杖"},
{type:"筹集委托",lv:"20",job:"雕金匠",it_id:"7479c85d6a0",it_no:"1",place:"石场水车",it_memo:"风华咒角 x 1",misson:"筹集委托：赠给英雄的魔器"},
{type:"制作委托",lv:"20",job:"雕金匠",it_id:"36ca2a6ca8e",it_no:"1",place:"石场水车",it_memo:"黄铜耳夹 x 1",misson:"制作委托：赠给义勇兵的耳饰"},
{type:"批发委托",lv:"20",job:"雕金匠",it_id:"5bd917ab354",it_no:"3",place:"石场水车",it_memo:"黄铜戒指 x 3",misson:"批发委托：赠给义勇兵的戒指"},
{type:"制作委托",lv:"25",job:"雕金匠",it_id:"83d84a9493d",it_no:"1",place:"乌尔达哈",it_memo:"白银戒指 x 1",misson:"制作委托：面向船员的戒指"},
{type:"筹集委托",lv:"25",job:"雕金匠",it_id:"6341dadc93c",it_no:"1",place:"石场水车",it_memo:"萤石戒指 x 1",misson:"筹集委托：献给法师的戒指"},
{type:"批发委托",lv:"25",job:"雕金匠",it_id:"352805b0158",it_no:"3",place:"乌尔达哈",it_memo:"白银作业眼镜 x 3",misson:"批发委托：手抄本作业用的眼镜"},
{type:"制作委托",lv:"25",job:"雕金匠",it_id:"d31d2bdf117",it_no:"1",place:"石场水车",it_memo:"兽角项链 x 1",misson:"制作委托：表彰优胜者的项链"},
{type:"批发委托",lv:"25",job:"雕金匠",it_id:"390de86b1dd",it_no:"3",place:"石场水车",it_memo:"兽齿羚羊角长杖 x 3",misson:"批发委托：筹集防卫费用的咒杖"},
{type:"筹集委托",lv:"30",job:"雕金匠",it_id:"cf0acd9e2ae",it_no:"1",place:"太阳海岸",it_memo:"白银头冠（透绿柱石） x 1",misson:"筹集委托：赠给吟游诗人的头冠"},
{type:"制作委托",lv:"30",job:"雕金匠",it_id:"800cc6d5abb",it_no:"1",place:"乌尔达哈",it_memo:"兽角戒指 x 1",misson:"制作委托：出口用的角制戒指"},
{type:"批发委托",lv:"30",job:"雕金匠",it_id:"d75d171b630",it_no:"3",place:"乌尔达哈",it_memo:"孔雀石手镯 x 3",misson:"批发委托：孔雀石手镯"},
{type:"制作委托",lv:"30",job:"雕金匠",it_id:"ce231b176b7",it_no:"1",place:"太阳海岸",it_memo:"白银工艺项环 x 1",misson:"制作委托：小猫猫的银项环"},
{type:"批发委托",lv:"30",job:"雕金匠",it_id:"872ccf489a0",it_no:"3",place:"太阳海岸",it_memo:"孔雀石耳坠 x 3",misson:"批发委托：孔雀石耳饰"},
{type:"筹集委托",lv:"35",job:"雕金匠",it_id:"a78f5483342",it_no:"1",place:"阿德内尔占星台",it_memo:"海蓝石手镯 x 1",misson:"筹集委托：异端审问官用的手镯"},
{type:"制作委托",lv:"35",job:"雕金匠",it_id:"3e04eb3fc1a",it_no:"1",place:"乌尔达哈",it_memo:"秘银戒指 x 1",misson:"制作委托：秘银戒指"},
{type:"批发委托",lv:"35",job:"雕金匠",it_id:"8911ca5a790",it_no:"3",place:"乌尔达哈",it_memo:"火华咒角 x 3",misson:"批发委托：热卖的咒杖"},
{type:"制作委托",lv:"35",job:"雕金匠",it_id:"11e0767430c",it_no:"1",place:"阿德内尔占星台",it_memo:"狼牙项链 x 1",misson:"制作委托：防狼护身符"},
{type:"批发委托",lv:"35",job:"雕金匠",it_id:"986d377d364",it_no:"3",place:"阿德内尔占星台",it_memo:"秘银耳环 x 3",misson:"批发委托：伊修加德的宝石饰品"},
{type:"筹集委托",lv:"40",job:"雕金匠",it_id:"247a4d4471b",it_no:"1",place:"白云崖前哨",it_memo:"红珊瑚戒指 x 1",misson:"筹集委托：红珊瑚戒指"},
{type:"制作委托",lv:"40",job:"雕金匠",it_id:"3a38b8a3dd2",it_no:"1",place:"乌尔达哈",it_memo:"秘银耳夹 x 1",misson:"制作委托：当红剑斗士的耳夹"},
{type:"批发委托",lv:"40",job:"雕金匠",it_id:"101a537a56f",it_no:"3",place:"乌尔达哈",it_memo:"红珊瑚腕环 x 3",misson:"批发委托：红珊瑚手镯"},
{type:"制作委托",lv:"40",job:"雕金匠",it_id:"7ec5ac2574d",it_no:"1",place:"白云崖前哨",it_memo:"兽角长杖 x 1",misson:"制作委托：面向骑兵团的魔器"},
{type:"批发委托",lv:"40",job:"雕金匠",it_id:"b0aaecf54e3",it_no:"3",place:"白云崖前哨",it_memo:"橄榄石耳坠 x 3",misson:"批发委托：橄榄石耳饰"},
{type:"筹集委托",lv:"45",job:"雕金匠",it_id:"fa54d6ac718",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"碧玺项环 x 1",misson:"筹集委托：希望的首饰"},
{type:"制作委托",lv:"45",job:"雕金匠",it_id:"1bff59ad5f3",it_no:"1",place:"乌尔达哈",it_memo:"绿金头冠（琥珀） x 1",misson:"制作委托：出口用的头冠"},
{type:"批发委托",lv:"45",job:"雕金匠",it_id:"2396787871c",it_no:"3",place:"乌尔达哈",it_memo:"红珊瑚项链 x 3",misson:"批发委托：红珊瑚首饰"},
{type:"制作委托",lv:"45",job:"雕金匠",it_id:"157b952b076",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"琥珀戒指 x 1",misson:"制作委托：送给股东的礼物"},
{type:"批发委托",lv:"45",job:"雕金匠",it_id:"7106b1722b1",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"琥珀项环 x 3",misson:"批发委托：团结的证明"},
{type:"制作委托",lv:"1",job:"制革匠",it_id:"245592f05c1",it_no:"1",place:"格里达尼亚",it_memo:"鞣革突骑帽 x 1",misson:"制作委托：面向工匠的皮革头巾"},
{type:"制作委托",lv:"1",job:"制革匠",it_id:"9c6b7abdb32",it_no:"1",place:"格里达尼亚",it_memo:"鞣革护腕 x 1",misson:"制作委托：皮革制护腕"},
{type:"制作委托",lv:"1",job:"制革匠",it_id:"9ccf755019d",it_no:"1",place:"烤饼练兵所",it_memo:"商人腰包 x 1",misson:"制作委托：新手辎重兵用的腰包"},
{type:"制作委托",lv:"1",job:"制革匠",it_id:"9c3f5d981ca",it_no:"1",place:"烤饼练兵所",it_memo:"鞣革项环 x 1",misson:"制作委托：训练用的项环"},
{type:"制作委托",lv:"5",job:"制革匠",it_id:"e6b153e444b",it_no:"1",place:"格里达尼亚",it_memo:"鞣革手环 x 1",misson:"制作委托：廉价的手环"},
{type:"制作委托",lv:"5",job:"制革匠",it_id:"dcf44d8bb94",it_no:"1",place:"格里达尼亚",it_memo:"鞣革护拳 x 1",misson:"制作委托：锻炼用的格斗武器"},
{type:"筹集委托",lv:"5",job:"制革匠",it_id:"1efc73c2c3e",it_no:"1",place:"烤饼练兵所",it_memo:"鞣革护腿 x 1",misson:"筹集委托：新手斥候用的长靴"},
{type:"制作委托",lv:"5",job:"制革匠",it_id:"2103658a369",it_no:"1",place:"烤饼练兵所",it_memo:"鞣革连指手套 x 1",misson:"制作委托：用于新兵训练的手套"},
{type:"制作委托",lv:"5",job:"制革匠",it_id:"a3f23f52e19",it_no:"1",place:"烤饼练兵所",it_memo:"硬革盔帽 x 1",misson:"制作委托：训练用的盔帽"},
{type:"制作委托",lv:"10",job:"制革匠",it_id:"e894d16d05a",it_no:"1",place:"格里达尼亚",it_memo:"硬革皮靴 x 1",misson:"制作委托：日常用的皮靴"},
{type:"制作委托",lv:"10",job:"制革匠",it_id:"7df2122ee4b",it_no:"1",place:"格里达尼亚",it_memo:"硬革护腕 x 1",misson:"制作委托：日常用的护腕"},
{type:"筹集委托",lv:"10",job:"制革匠",it_id:"50677e12554",it_no:"3",place:"弯枝牧场",it_memo:"硬革 x 3",misson:"筹集委托：经过硬化处理的皮革"},
{type:"制作委托",lv:"10",job:"制革匠",it_id:"a7614bed344",it_no:"1",place:"弯枝牧场",it_memo:"硬革格斗服 x 1",misson:"制作委托：骑手用的格斗服"},
{type:"制作委托",lv:"10",job:"制革匠",it_id:"96029646ce8",it_no:"1",place:"弯枝牧场",it_memo:"硬革战靴 x 1",misson:"制作委托：骑手用的战靴"},
{type:"制作委托",lv:"15",job:"制革匠",it_id:"275c283ccf8",it_no:"1",place:"格里达尼亚",it_memo:"硬革项环 x 1",misson:"制作委托：广受欢迎的项链"},
{type:"制作委托",lv:"15",job:"制革匠",it_id:"a1a6219087e",it_no:"1",place:"格里达尼亚",it_memo:"硬革小帽 x 1",misson:"制作委托：提供给园艺工的皮帽"},
{type:"筹集委托",lv:"15",job:"制革匠",it_id:"efa98e6694b",it_no:"3",place:"霍桑山寨",it_memo:"山羊革 x 3",misson:"筹集委托：大山羊鞣皮"},
{type:"制作委托",lv:"15",job:"制革匠",it_id:"50677e12554",it_no:"1",place:"霍桑山寨",it_memo:"硬革 x 1",misson:"制作委托：提供给鬼哭队的手环"},
{type:"制作委托",lv:"15",job:"制革匠",it_id:"ec4e5f36026",it_no:"1",place:"霍桑山寨",it_memo:"硬革便鞋 x 1",misson:"制作委托：提供给工匠的皮靴"},
{type:"制作委托",lv:"20",job:"制革匠",it_id:"5588d51be30",it_no:"1",place:"格里达尼亚",it_memo:"山羊革护臂 x 1",misson:"制作委托：演员用的护臂"},
{type:"批发委托",lv:"20",job:"制革匠",it_id:"efa98e6694b",it_no:"5",place:"格里达尼亚",it_memo:"山羊革 x 5",misson:"批发委托：大山羊鞣皮"},
{type:"筹集委托",lv:"20",job:"制革匠",it_id:"13f67e17e61",it_no:"1",place:"石场水车",it_memo:"内衬鞣革鸭嘴靴 x 1",misson:"筹集委托：赠给义勇兵的鸭嘴靴"},
{type:"制作委托",lv:"20",job:"制革匠",it_id:"07375aa202c",it_no:"1",place:"石场水车",it_memo:"山羊革半指护手 x 1",misson:"制作委托：作业用的护手"},
{type:"批发委托",lv:"20",job:"制革匠",it_id:"84ccf1c33bb",it_no:"3",place:"石场水车",it_memo:"硬革钢拳 x 3",misson:"批发委托：提供给鬼哭队的钢拳"},
{type:"制作委托",lv:"25",job:"制革匠",it_id:"bbec7d6f802",it_no:"1",place:"格里达尼亚",it_memo:"山羊革皮盾 x 1",misson:"制作委托：大山羊革包覆的盾"},
{type:"筹集委托",lv:"25",job:"制革匠",it_id:"78643d85686",it_no:"1",place:"石场水车",it_memo:"山羊革手环 x 1",misson:"筹集委托：赠送给冒险者的手环"},
{type:"批发委托",lv:"25",job:"制革匠",it_id:"3beeb8d6437",it_no:"3",place:"格里达尼亚",it_memo:"旅行腰带 x 3",misson:"批发委托：领航员用的旅行腰带"},
{type:"制作委托",lv:"25",job:"制革匠",it_id:"e435852e25d",it_no:"1",place:"石场水车",it_memo:"蟾蜍钢拳 x 1",misson:"制作委托：赠给体术指导员的钢拳"},
{type:"批发委托",lv:"25",job:"制革匠",it_id:"13f67e17e61",it_no:"3",place:"石场水车",it_memo:"内衬鞣革鸭嘴靴 x 3",misson:"批发委托：赠给义勇兵的鸭嘴靴"},
{type:"筹集委托",lv:"30",job:"制革匠",it_id:"96e98cf611b",it_no:"1",place:"太阳海岸",it_memo:"野猪革结扣腰带 x 1",misson:"筹集委托：用作样品的旅行腰带"},
{type:"品质指定",lv:"30",job:"制革匠",it_id:"df358548d6a",it_no:"1",place:"格里达尼亚",it_memo:"野猪护拳 x 1",misson:"品质指定：优质野猪护拳"},
{type:"批发委托",lv:"30",job:"制革匠",it_id:"da59dc64105",it_no:"5",place:"格里达尼亚",it_memo:"巨蟾蜍革 x 5",misson:"批发委托：巨蟾蜍革"},
{type:"制作委托",lv:"30",job:"制革匠",it_id:"30aa320cca0",it_no:"1",place:"太阳海岸",it_memo:"野猪革项环 x 1",misson:"制作委托：小猫咪的皮革项环"},
{type:"批发委托",lv:"30",job:"制革匠",it_id:"bb9d0aafc88",it_no:"3",place:"太阳海岸",it_memo:"山羊革项环 x 3",misson:"批发委托：捐赠给黑涡团的项环"},
{type:"筹集委托",lv:"35",job:"制革匠",it_id:"6e7baf7fadb",it_no:"1",place:"阿德内尔占星台",it_memo:"野猪革手箍 x 1",misson:"筹集委托：异端审问官用的鞣革手箍"},
{type:"制作委托",lv:"35",job:"制革匠",it_id:"4b7c9a46329",it_no:"1",place:"格里达尼亚",it_memo:"毒蜥蜴革尖头靴 x 1",misson:"制作委托：毒蜥蜴革皮靴"},
{type:"批发委托",lv:"35",job:"制革匠",it_id:"ffcc67667dc",it_no:"5",place:"格里达尼亚",it_memo:"野猪革 x 5",misson:"批发委托：防具用的野猪革"},
{type:"制作委托",lv:"35",job:"制革匠",it_id:"0bc204817a5",it_no:"1",place:"阿德内尔占星台",it_memo:"毒蜥蜴革半指护手 x 1",misson:"制作委托：望远镜技师用的护手"},
{type:"批发委托",lv:"35",job:"制革匠",it_id:"30aa320cca0",it_no:"3",place:"阿德内尔占星台",it_memo:"野猪革项环 x 3",misson:"批发委托：结实的皮革项环"},
{type:"筹集委托",lv:"40",job:"制革匠",it_id:"3f3777952f7",it_no:"1",place:"白云崖前哨",it_memo:"野猪革及膝裤 x 1",misson:"筹集委托：鸟栏管理员用的工装裤"},
{type:"制作委托",lv:"40",job:"制革匠",it_id:"ba2c736932e",it_no:"1",place:"格里达尼亚",it_memo:"野猪革短裙 x 1",misson:"制作委托：轻便短裙"},
{type:"批发委托",lv:"40",job:"制革匠",it_id:"95dd9c7e580",it_no:"3",place:"格里达尼亚",it_memo:"野猪革格斗服 x 3",misson:"批发委托：拳斗士风格斗服"},
{type:"制作委托",lv:"40",job:"制革匠",it_id:"1d32d738057",it_no:"1",place:"白云崖前哨",it_memo:"野猪革皮衣 x 1",misson:"制作委托：鸟栏管理员用的工作服"},
{type:"批发委托",lv:"40",job:"制革匠",it_id:"5e936ccb91f",it_no:"5",place:"白云崖前哨",it_memo:"毒蜥蜴革 x 5",misson:"批发委托：修补皮鞍用的毒蜥蜴革"},
{type:"筹集委托",lv:"45",job:"制革匠",it_id:"feae820f663",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"盗龙烹饪腰带 x 1",misson:"筹集委托：送给后勤人员的腰带"},
{type:"制作委托",lv:"45",job:"制革匠",it_id:"409a7ebbd5c",it_no:"1",place:"格里达尼亚",it_memo:"盗龙革手环 x 1",misson:"制作委托：送给引退队员的手镯"},
{type:"批发委托",lv:"45",job:"制革匠",it_id:"ec18ff7554b",it_no:"3",place:"格里达尼亚",it_memo:"毒蜥蜴革钢拳 x 3",misson:"批发委托：传说中的拳圣钢拳"},
{type:"制作委托",lv:"45",job:"制革匠",it_id:"f0606a46220",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"狩猎靴 x 1",misson:"制作委托：挖掘调查员用的狩猎靴"},
{type:"批发委托",lv:"45",job:"制革匠",it_id:"49df790fc93",it_no:"5",place:"圣寇伊纳克调查地",it_memo:"盗龙革 x 5",misson:"批发委托：打包挖掘品用的皮革"},
{type:"制作委托",lv:"1",job:"裁衣匠",it_id:"ca9a8ab1541",it_no:"1",place:"乌尔达哈",it_memo:"草布内裤 x 1",misson:"制作委托：廉价的内衣"},
{type:"制作委托",lv:"1",job:"裁衣匠",it_id:"7c2b93c1613",it_no:"1",place:"乌尔达哈",it_memo:"草布裤袜 x 1",misson:"制作委托：面向工匠的裤子"},
{type:"制作委托",lv:"1",job:"裁衣匠",it_id:"f6225873adc",it_no:"1",place:"毒蝎交易所",it_memo:"草布半指手套 x 1",misson:"制作委托：运货人的手套"},
{type:"制作委托",lv:"1",job:"裁衣匠",it_id:"122cb291cc1",it_no:"1",place:"毒蝎交易所",it_memo:"草布僧袍 x 1",misson:"制作委托：热卖的僧袍"},
{type:"制作委托",lv:"5",job:"裁衣匠",it_id:"f014c4b7e3c",it_no:"1",place:"乌尔达哈",it_memo:"草布短袖罩衣 x 1",misson:"制作委托：廉价的短袖罩衣"},
{type:"制作委托",lv:"5",job:"裁衣匠",it_id:"019305b4ff1",it_no:"1",place:"乌尔达哈",it_memo:"业余厚袍 x 1",misson:"制作委托：廉价的厚袍"},
{type:"筹集委托",lv:"5",job:"裁衣匠",it_id:"147c46dc636",it_no:"1",place:"毒蝎交易所",it_memo:"草布腿套 x 1",misson:"筹集委托：面向矿山劳动者的腿套"},
{type:"制作委托",lv:"5",job:"裁衣匠",it_id:"4f2a74452b6",it_no:"1",place:"毒蝎交易所",it_memo:"草布束腰牧衣 x 1",misson:"制作委托：面向牧童的束腰牧衣"},
{type:"制作委托",lv:"5",job:"裁衣匠",it_id:"97c959e8b01",it_no:"1",place:"毒蝎交易所",it_memo:"业余马裤 x 1",misson:"制作委托：面向侍者的裤子"},
{type:"制作委托",lv:"10",job:"裁衣匠",it_id:"085726c6aa2",it_no:"1",place:"乌尔达哈",it_memo:"草帽 x 1",misson:"制作委托：送礼用的草帽"},
{type:"制作委托",lv:"10",job:"裁衣匠",it_id:"3b9782acfe9",it_no:"1",place:"乌尔达哈",it_memo:"棉布围巾 x 1",misson:"制作委托：面向采矿工的围巾"},
{type:"筹集委托",lv:"10",job:"裁衣匠",it_id:"76f91d1f4f6",it_no:"1",place:"地平关",it_memo:"棉布包头巾 x 1",misson:"筹集委托：面向贸易商人的包头巾"},
{type:"制作委托",lv:"10",job:"裁衣匠",it_id:"d7f8a5add2b",it_no:"1",place:"地平关",it_memo:"草布弓术手套 x 1",misson:"制作委托：赠给技师的手套"},
{type:"制作委托",lv:"10",job:"裁衣匠",it_id:"43823c803ff",it_no:"1",place:"地平关",it_memo:"棉布半指手套 x 1",misson:"制作委托：出口用的手套"},
{type:"制作委托",lv:"15",job:"裁衣匠",it_id:"6e2ae9d5ea5",it_no:"1",place:"乌尔达哈",it_memo:"棉布束腰牧衣 x 1",misson:"制作委托：面向格里达尼亚的束腰衣"},
{type:"制作委托",lv:"15",job:"裁衣匠",it_id:"1992fe72f44",it_no:"1",place:"乌尔达哈",it_memo:"新来者工作裤 x 1",misson:"制作委托：面向格里达尼亚的裤子"},
{type:"筹集委托",lv:"15",job:"裁衣匠",it_id:"3e207014002",it_no:"1",place:"枯骨营地",it_memo:"棉布无领衬衫 x 1",misson:"筹集委托：陪葬品无领衬衫"},
{type:"制作委托",lv:"15",job:"裁衣匠",it_id:"6225acd25ff",it_no:"1",place:"枯骨营地",it_memo:"内衬草布软甲裤 x 1",misson:"制作委托：用于长途旅行的软甲裤"},
{type:"制作委托",lv:"15",job:"裁衣匠",it_id:"0ac340dfbf3",it_no:"1",place:"枯骨营地",it_memo:"棉布工作手套 x 1",misson:"制作委托：面向工匠的手套"},
{type:"制作委托",lv:"20",job:"裁衣匠",it_id:"f796ae6f278",it_no:"1",place:"乌尔达哈",it_memo:"棉布腰围 x 1",misson:"制作委托：面向商人的腰围"},
{type:"批发委托",lv:"20",job:"裁衣匠",it_id:"829b5df3e37",it_no:"3",place:"乌尔达哈",it_memo:"棉布巧匠马裤 x 3",misson:"批发委托：面向工匠的裤子"},
{type:"筹集委托",lv:"20",job:"裁衣匠",it_id:"7c76c2e3f45",it_no:"1",place:"石场水车",it_memo:"棉布大地工作坎肩 x 1",misson:"筹集委托：赠给义勇兵的衣服"},
{type:"制作委托",lv:"20",job:"裁衣匠",it_id:"7a2235916a2",it_no:"1",place:"石场水车",it_memo:"棉布礼服手套 x 1",misson:"制作委托：回礼用的手套"},
{type:"批发委托",lv:"20",job:"裁衣匠",it_id:"72d45da405a",it_no:"3",place:"石场水车",it_memo:"棉布大地兜帽 x 3",misson:"批发委托：用于采伐工作的头巾"},
{type:"制作委托",lv:"25",job:"裁衣匠",it_id:"6effea1bca4",it_no:"1",place:"乌尔达哈",it_memo:"棉绒衬衫 x 1",misson:"制作委托：面向船员的衬衫"},
{type:"筹集委托",lv:"25",job:"裁衣匠",it_id:"e480dc2ea3e",it_no:"1",place:"石场水车",it_memo:"棉绒大地无檐帽 x 1",misson:"筹集委托：回礼用的工作帽"},
{type:"批发委托",lv:"25",job:"裁衣匠",it_id:"4e150e6c9fd",it_no:"3",place:"乌尔达哈",it_memo:"棉绒垮裤 x 3",misson:"批发委托：流行的棉绒裤子"},
{type:"制作委托",lv:"25",job:"裁衣匠",it_id:"1992fe72f44",it_no:"1",place:"石场水车",it_memo:"新来者工作裤 x 1",misson:"制作委托：赠给义勇兵的裤子"},
{type:"批发委托",lv:"25",job:"裁衣匠",it_id:"0bcbd5140fc",it_no:"3",place:"石场水车",it_memo:"棉绒大地垮裤 x 3",misson:"批发委托：用于采集工作的裤子"},
{type:"筹集委托",lv:"30",job:"裁衣匠",it_id:"c6ff4de5509",it_no:"1",place:"太阳海岸",it_memo:"亚麻裤袜 x 1",misson:"筹集委托：小猫咪的裤子"},
{type:"制作委托",lv:"30",job:"裁衣匠",it_id:"8b77d22ed17",it_no:"1",place:"乌尔达哈",it_memo:"棉绒短袍 x 1",misson:"制作委托：黑马手套"},
{type:"批发委托",lv:"30",job:"裁衣匠",it_id:"c7bb95402ad",it_no:"3",place:"乌尔达哈",it_memo:"棉绒工作手套 x 3",misson:"批发委托：流行的棉绒手套"},
{type:"制作委托",lv:"30",job:"裁衣匠",it_id:"0b38dd738e1",it_no:"1",place:"太阳海岸",it_memo:"棉绒束膝裤 x 1",misson:"制作委托：用于晚会的裤子"},
{type:"批发委托",lv:"30",job:"裁衣匠",it_id:"9d5f44c0519",it_no:"3",place:"太阳海岸",it_memo:"棉绒礼鞋 x 3",misson:"批发委托：护卫用的靴子"},
{type:"筹集委托",lv:"35",job:"裁衣匠",it_id:"f2c6b6c5a5d",it_no:"1",place:"阿德内尔占星台",it_memo:"亚麻大地无檐帽 x 1",misson:"筹集委托：望远镜技师用的工作帽"},
{type:"制作委托",lv:"35",job:"裁衣匠",it_id:"bc97746cd7b",it_no:"1",place:"乌尔达哈",it_memo:"亚麻软甲裤 x 1",misson:"制作委托：面向剑术师的裤子"},
{type:"批发委托",lv:"35",job:"裁衣匠",it_id:"d6da2dc2e15",it_no:"3",place:"乌尔达哈",it_memo:"亚麻宽边帽 x 3",misson:"批发委托：出口用的朴素帽子"},
{type:"制作委托",lv:"35",job:"裁衣匠",it_id:"6a4a88352ac",it_no:"1",place:"阿德内尔占星台",it_memo:"亚麻僧袍 x 1",misson:"制作委托：防寒用的僧袍"},
{type:"批发委托",lv:"35",job:"裁衣匠",it_id:"899c12992d0",it_no:"3",place:"阿德内尔占星台",it_memo:"亚麻紧身裤 x 3",misson:"批发委托：面向骑兵的紧身裤"},
{type:"筹集委托",lv:"40",job:"裁衣匠",it_id:"08af4086348",it_no:"1",place:"白云崖前哨",it_memo:"呢绒腿套 x 1",misson:"筹集委托：面向后勤人员的腿套"},
{type:"制作委托",lv:"40",job:"裁衣匠",it_id:"7acbde32e80",it_no:"1",place:"乌尔达哈",it_memo:"亚麻围裙装 x 1",misson:"制作委托：鸟栏管理员用的围裙装"},
{type:"批发委托",lv:"40",job:"裁衣匠",it_id:"20fc3ac11c3",it_no:"3",place:"乌尔达哈",it_memo:"亚麻猎鹿帽 x 3",misson:"批发委托：佣人用的制帽"},
{type:"制作委托",lv:"40",job:"裁衣匠",it_id:"0a010796b6a",it_no:"1",place:"白云崖前哨",it_memo:"呢绒紧身裤 x 1",misson:"制作委托：神殿骑士用的防寒裤"},
{type:"批发委托",lv:"40",job:"裁衣匠",it_id:"e07894d8f7f",it_no:"3",place:"白云崖前哨",it_memo:"呢绒宽边帽 x 3",misson:"批发委托：热卖的宽边帽"},
{type:"筹集委托",lv:"45",job:"裁衣匠",it_id:"90535aaca74",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"纤维裤袜 x 1",misson:"筹集委托：挖掘工人用的工装裤"},
{type:"制作委托",lv:"45",job:"裁衣匠",it_id:"1c0f32aee12",it_no:"1",place:"乌尔达哈",it_memo:"纤维宽边帽 x 1",misson:"制作委托：法师用的宽边帽"},
{type:"批发委托",lv:"45",job:"裁衣匠",it_id:"3570d193074",it_no:"3",place:"乌尔达哈",it_memo:"呢绒围裙装 x 3",misson:"批发委托：专属烹调师用的衣服"},
{type:"制作委托",lv:"45",job:"裁衣匠",it_id:"f3cac383e06",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"纤维长袍 x 1",misson:"制作委托：博物学家用的长袍"},
{type:"批发委托",lv:"45",job:"裁衣匠",it_id:"f9d4a1e9d5a",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"呢绒猎鹿帽 x 3",misson:"批发委托：挖掘工人用的工作帽"},
{type:"制作委托",lv:"1",job:"炼金术士",it_id:"a7db5dd6f38",it_no:"3",place:"乌尔达哈",it_memo:"水银 x 3",misson:"制作委托：毒药的材料"},
{type:"制作委托",lv:"1",job:"炼金术士",it_id:"a2abfbc4586",it_no:"1",place:"乌尔达哈",it_memo:"鞣革魔导书 x 1",misson:"制作委托：流行的魔导书"},
{type:"制作委托",lv:"1",job:"炼金术士",it_id:"b5b557a1f76",it_no:"3",place:"毒蝎交易所",it_memo:"黏胶 x 3",misson:"制作委托：用于制造武具的粘着剂"},
{type:"制作委托",lv:"1",job:"炼金术士",it_id:"b2f3e0cf553",it_no:"3",place:"毒蝎交易所",it_memo:"解毒药 x 3",misson:"制作委托：旅行商人的必需品"},
{type:"制作委托",lv:"5",job:"炼金术士",it_id:"4aef0f04d56",it_no:"1",place:"乌尔达哈",it_memo:"眼药 x 1",misson:"制作委托：对抗沙尘的眼药"},
{type:"制作委托",lv:"5",job:"炼金术士",it_id:"9e4d79546c7",it_no:"3",place:"乌尔达哈",it_memo:"蒸馏水 x 3",misson:"制作委托：夫人的饮用水"},
{type:"筹集委托",lv:"5",job:"炼金术士",it_id:"a911535239f",it_no:"1",place:"毒蝎交易所",it_memo:"低语枫木幻杖 x 1",misson:"筹集委托：初学者用的改良幻杖"},
{type:"制作委托",lv:"5",job:"炼金术士",it_id:"632d9ba0c71",it_no:"3",place:"毒蝎交易所",it_memo:"橡胶 x 3",misson:"制作委托：用于缓冲的橡胶"},
{type:"制作委托",lv:"5",job:"炼金术士",it_id:"0b5f9d0497e",it_no:"3",place:"毒蝎交易所",it_memo:"蜂蜡 x 3",misson:"制作委托：用于蜡烛的蜂蜡"},
{type:"制作委托",lv:"10",job:"炼金术士",it_id:"f2e8c35f26e",it_no:"1",place:"乌尔达哈",it_memo:"绿叶枫木幻杖 x 1",misson:"制作委托：用于新事业的枫木幻杖"},
{type:"制作委托",lv:"10",job:"炼金术士",it_id:"e17720616ab",it_no:"1",place:"乌尔达哈",it_memo:"以太药 x 1",misson:"制作委托：面向咒术师行会的以太药"},
{type:"筹集委托",lv:"10",job:"炼金术士",it_id:"2f8b30a4898",it_no:"1",place:"地平关",it_memo:"梣木巫书 x 1",misson:"筹集委托：用于海关研修的魔导书"},
{type:"制作委托",lv:"10",job:"炼金术士",it_id:"7992765ec34",it_no:"3",place:"地平关",it_memo:"恢复药 x 3",misson:"制作委托：运货人的随身药"},
{type:"制作委托",lv:"10",job:"炼金术士",it_id:"bc73018d986",it_no:"3",place:"地平关",it_memo:"植物成长剂2型 x 3",misson:"制作委托：用于新耕作方法的炼金药"},
{type:"制作委托",lv:"15",job:"炼金术士",it_id:"eadbea80388",it_no:"1",place:"乌尔达哈",it_memo:"梣木幻杖 x 1",misson:"制作委托：面向冒险者的梣木幻杖"},
{type:"制作委托",lv:"15",job:"炼金术士",it_id:"f3feed6403c",it_no:"1",place:"乌尔达哈",it_memo:"雕花硬革魔导书 x 1",misson:"制作委托：确保魔导书的库存"},
{type:"筹集委托",lv:"15",job:"炼金术士",it_id:"e4541c9f32b",it_no:"3",place:"枯骨营地",it_memo:"耐力之药 x 3",misson:"筹集委托：给人打气的炼金药"},
{type:"制作委托",lv:"15",job:"炼金术士",it_id:"34f9322875e",it_no:"1",place:"枯骨营地",it_memo:"硬革魔导书 x 1",misson:"制作委托：献给故人的魔导书"},
{type:"制作委托",lv:"15",job:"炼金术士",it_id:"92e3c689742",it_no:"3",place:"枯骨营地",it_memo:"意力之药 x 3",misson:"制作委托：安慰人的炼金药"},
{type:"制作委托",lv:"20",job:"炼金术士",it_id:"370318df042",it_no:"1",place:"乌尔达哈",it_memo:"绿叶梣木幻杖 x 1",misson:"制作委托：野性十足的幻杖"},
{type:"批发委托",lv:"20",job:"炼金术士",it_id:"a9451ac1afc",it_no:"5",place:"乌尔达哈",it_memo:"智力之药 x 5",misson:"批发委托：研究生最想要的"},
{type:"筹集委托",lv:"20",job:"炼金术士",it_id:"24994c7567f",it_no:"3",place:"石场水车",it_memo:"白银附魔墨水 x 3",misson:"筹集委托：用于传令书信的墨水"},
{type:"制作委托",lv:"20",job:"炼金术士",it_id:"31afb5c3870",it_no:"3",place:"石场水车",it_memo:"失明毒药 x 3",misson:"制作委托：义勇兵用的毒药"},
{type:"批发委托",lv:"20",job:"炼金术士",it_id:"5e4590739c6",it_no:"5",place:"石场水车",it_memo:"巧力之药 x 5",misson:"批发委托：义勇兵用的炼金药"},
{type:"制作委托",lv:"25",job:"炼金术士",it_id:"f4db4319748",it_no:"3",place:"乌尔达哈",it_memo:"蟹油 x 3",misson:"制作委托：用于魔法人偶的油"},
{type:"筹集委托",lv:"25",job:"炼金术士",it_id:"9902d9a76aa",it_no:"1",place:"石场水车",it_memo:"玻璃板 x 1",misson:"筹集委托：嵌在窗户上的玻璃板"},
{type:"批发委托",lv:"25",job:"炼金术士",it_id:"437845dd7da",it_no:"3",place:"乌尔达哈",it_memo:"山羊革魔导书 x 3",misson:"批发委托：面向中级秘术师的魔导书"},
{type:"制作委托",lv:"25",job:"炼金术士",it_id:"100c7fe3448",it_no:"1",place:"石场水车",it_memo:"低语梣木幻杖 x 1",misson:"制作委托：献给法师的幻杖"},
{type:"批发委托",lv:"25",job:"炼金术士",it_id:"8ac77138b26",it_no:"5",place:"石场水车",it_memo:"高级恢复药 x 5",misson:"批发委托：辅城的备用药"},
{type:"筹集委托",lv:"30",job:"炼金术士",it_id:"fbd6ccaeb89",it_no:"1",place:"太阳海岸",it_memo:"刚力之妙药 x 1",misson:"筹集委托：用于紧急情况的军用药"},
{type:"制作委托",lv:"30",job:"炼金术士",it_id:"9f6c53503a5",it_no:"1",place:"乌尔达哈",it_memo:"意力之妙药 x 1",misson:"制作委托：出口用的妙药"},
{type:"批发委托",lv:"30",job:"炼金术士",it_id:"dbd4ac8fcca",it_no:"5",place:"乌尔达哈",it_memo:"鬼胶 x 5",misson:"批发委托：大量的鬼胶"},
{type:"批发委托",lv:"30",job:"炼金术士",it_id:"723759c5260",it_no:"3",place:"太阳海岸",it_memo:"植物成长剂3型 x 3",misson:"批发委托：用于维持景观的成长促进剂"},
{type:"筹集委托",lv:"35",job:"炼金术士",it_id:"991ac21d0cf",it_no:"1",place:"阿德内尔占星台",it_memo:"绿叶橡木幻杖 x 1",misson:"筹集委托：异端审问官用的幻杖"},
{type:"制作委托",lv:"35",job:"炼金术士",it_id:"fe6c20a8964",it_no:"5",place:"乌尔达哈",it_memo:"失明猛毒药 x 5",misson:"制作委托：失明猛毒药"},
{type:"批发委托",lv:"35",job:"炼金术士",it_id:"deb6ca694d4",it_no:"5",place:"乌尔达哈",it_memo:"损血猛毒药 x 5",misson:"批发委托：热卖商品猛毒药"},
{type:"制作委托",lv:"35",job:"炼金术士",it_id:"f841dc0110f",it_no:"3",place:"阿德内尔占星台",it_memo:"睡眠猛毒药 x 3",misson:"制作委托：失眠症的对策"},
{type:"批发委托",lv:"35",job:"炼金术士",it_id:"0102b2cabf3",it_no:"5",place:"阿德内尔占星台",it_memo:"麻痹猛毒药 x 5",misson:"批发委托：异端审问官用的麻醉药"},
{type:"筹集委托",lv:"40",job:"炼金术士",it_id:"1e8c49c8ac3",it_no:"3",place:"白云崖前哨",it_memo:"超级恢复药 x 3",misson:"筹集委托：面向骑兵团的军用药"},
{type:"制作委托",lv:"40",job:"炼金术士",it_id:"5fb1533e66a",it_no:"3",place:"乌尔达哈",it_memo:"鲨油 x 3",misson:"制作委托：卷扬机的润滑油"},
{type:"批发委托",lv:"40",job:"炼金术士",it_id:"1bfaf57bebd",it_no:"5",place:"乌尔达哈",it_memo:"苏醒药 x 5",misson:"批发委托：出口用的苏醒药"},
{type:"制作委托",lv:"40",job:"炼金术士",it_id:"c303f855a4a",it_no:"1",place:"白云崖前哨",it_memo:"秘银之书 x 1",misson:"制作委托：新战术的验证材料"},
{type:"批发委托",lv:"40",job:"炼金术士",it_id:"bb94025b4a4",it_no:"5",place:"白云崖前哨",it_memo:"羊毛脂 x 5",misson:"批发委托：防锈用的羊毛脂"},
{type:"筹集委托",lv:"45",job:"炼金术士",it_id:"b3dccc64e49",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"睡眠剧毒药 x 3",misson:"筹集委托：防身用的睡眠剧毒药"},
{type:"制作委托",lv:"45",job:"炼金术士",it_id:"0b49a20a40b",it_no:"3",place:"乌尔达哈",it_memo:"金针 x 3",misson:"制作委托：出口用的金针"},
{type:"批发委托",lv:"45",job:"炼金术士",it_id:"03fb38cd4bb",it_no:"5",place:"乌尔达哈",it_memo:"耐力之秘药 x 5",misson:"批发委托：面向富裕阶层的耐力之秘药"},
{type:"制作委托",lv:"45",job:"炼金术士",it_id:"6716d7a86a8",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"损血剧毒药 x 3",misson:"制作委托：捕雕用的毒药"},
{type:"批发委托",lv:"45",job:"炼金术士",it_id:"0c896f1e462",it_no:"5",place:"圣寇伊纳克调查地",it_memo:"刚力之秘药 x 5",misson:"批发委托：挖掘工人用的炼金药"},
{type:"制作委托",lv:"1",job:"烹调师",it_id:"e813dbce507",it_no:"1",place:"赤血雄鸡农场",it_memo:"栗鼠肉排 x 1",misson:"制作委托：解恨的肉排"},
{type:"制作委托",lv:"1",job:"烹调师",it_id:"2b0bab4841b",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"盐烤公主鳟 x 1",misson:"制作委托：运货人的午餐"},
{type:"制作委托",lv:"1",job:"烹调师",it_id:"f7580421732",it_no:"9",place:"利姆萨·罗敏萨",it_memo:"食盐 x 9",misson:"制作委托：用于储备的食盐"},
{type:"制作委托",lv:"1",job:"烹调师",it_id:"89b37589cd8",it_no:"5",place:"赤血雄鸡农场",it_memo:"枫糖浆 x 5",misson:"制作委托：用于饼干的甜调味料"},
{type:"制作委托",lv:"5",job:"烹调师",it_id:"9be799d8267",it_no:"5",place:"赤血雄鸡农场",it_memo:"可可油 x 5",misson:"制作委托：庆生巧克力的原料"},
{type:"制作委托",lv:"5",job:"烹调师",it_id:"72f42d23076",it_no:"5",place:"利姆萨·罗敏萨",it_memo:"奶油 x 5",misson:"制作委托：人气商品奶油"},
{type:"制作委托",lv:"5",job:"烹调师",it_id:"9e6d538a2a8",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"杰克南瓜灯 x 1",misson:"制作委托：孤儿们的梦想"},
{type:"制作委托",lv:"5",job:"烹调师",it_id:"8a07ba64163",it_no:"1",place:"赤血雄鸡农场",it_memo:"橙汁 x 1",misson:"制作委托：不够的橙汁"},
{type:"筹集委托",lv:"5",job:"烹调师",it_id:"a48dada5364",it_no:"1",place:"赤血雄鸡农场",it_memo:"油炒鸡油菌 x 1",misson:"筹集委托：美味的油炒鸡油菌"},
{type:"制作委托",lv:"10",job:"烹调师",it_id:"c878d79a193",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"盐烤鲤鱼 x 1",misson:"制作委托：酒宴用的烧鱼"},
{type:"制作委托",lv:"10",job:"烹调师",it_id:"6c59a4e96cd",it_no:"1",place:"雨燕塔殖民地",it_memo:"盐渍鳕鱼 x 1",misson:"制作委托：面向贸易船的盐渍鳕鱼"},
{type:"制作委托",lv:"10",job:"烹调师",it_id:"b3f3e79685c",it_no:"1",place:"雨燕塔殖民地",it_memo:"渡渡鸟烤肉 x 1",misson:"制作委托：谈判时的料理"},
{type:"制作委托",lv:"10",job:"烹调师",it_id:"0b31333e286",it_no:"5",place:"利姆萨·罗敏萨",it_memo:"可可粉 x 5",misson:"制作委托：面向烹调师行会的可可粉"},
{type:"筹集委托",lv:"10",job:"烹调师",it_id:"6751cc19541",it_no:"1",place:"雨燕塔殖民地",it_memo:"鼹鼠肉糕 x 1",misson:"筹集委托：未来的人气商品"},
{type:"制作委托",lv:"15",job:"烹调师",it_id:"cf9f9364fea",it_no:"5",place:"小麦酒港",it_memo:"薰衣草油 x 5",misson:"制作委托：出口用的精油"},
{type:"制作委托",lv:"15",job:"烹调师",it_id:"15b58167fc1",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"渡渡鸟蛋煎蛋卷 x 1",misson:"制作委托：用于招待的蛋卷"},
{type:"制作委托",lv:"15",job:"烹调师",it_id:"b86eaf4c272",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"生鲜牡蛎 x 1",misson:"制作委托：犒劳船长的料理"},
{type:"制作委托",lv:"15",job:"烹调师",it_id:"40043d79006",it_no:"1",place:"小麦酒港",it_memo:"金钱蘑炒鸡肉 x 1",misson:"制作委托：赫·兰博罗船长的最爱"},
{type:"筹集委托",lv:"15",job:"烹调师",it_id:"4f3b15d6c37",it_no:"1",place:"小麦酒港",it_memo:"胡桃面包 x 1",misson:"筹集委托：储备在商船里的食品"},
{type:"制作委托",lv:"20",job:"烹调师",it_id:"14eb9b6b442",it_no:"1",place:"石场水车",it_memo:"蜂蜜松饼 x 1",misson:"制作委托：队员的粮草"},
{type:"制作委托",lv:"20",job:"烹调师",it_id:"250da5060f3",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"葡萄汁 x 1",misson:"制作委托：兑酒用的果汁"},
{type:"筹集委托",lv:"20",job:"烹调师",it_id:"b9e87537693",it_no:"1",place:"石场水车",it_memo:"鲑鱼排 x 1",misson:"筹集委托：提供给义勇兵的料理"},
{type:"批发委托",lv:"20",job:"烹调师",it_id:"7ba44f752c7",it_no:"3",place:"石场水车",it_memo:"苹果挞 x 3",misson:"批发委托：赠给孩子们的点心"},
{type:"批发委托",lv:"20",job:"烹调师",it_id:"4f3b15d6c37",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"胡桃面包 x 3",misson:"批发委托：运货人的早餐"},
{type:"制作委托",lv:"25",job:"烹调师",it_id:"b5b94f09f7d",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"生姜饼干 x 1",misson:"制作委托：面向贸易船的饼干"},
{type:"制作委托",lv:"25",job:"烹调师",it_id:"3392f405565",it_no:"1",place:"石场水车",it_memo:"翡翠豆汤 x 1",misson:"制作委托：面向斥候的汤"},
{type:"筹集委托",lv:"25",job:"烹调师",it_id:"9a2b37509af",it_no:"9",place:"石场水车",it_memo:"鸡高汤 x 9",misson:"筹集委托：炖肉的材料"},
{type:"批发委托",lv:"25",job:"烹调师",it_id:"4c1d879486c",it_no:"3",place:"石场水车",it_memo:"鳗鱼派 x 3",misson:"批发委托：宴会上的派"},
{type:"批发委托",lv:"25",job:"烹调师",it_id:"1d635632909",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"甘菊茶 x 3",misson:"批发委托：促销用的花茶"},
{type:"制作委托",lv:"30",job:"烹调师",it_id:"9b515fcfa0f",it_no:"1",place:"太阳海岸",it_memo:"猫魅风味海产烤串 x 1",misson:"制作委托：小猫咪的最爱"},
{type:"制作委托",lv:"30",job:"烹调师",it_id:"566239bbe58",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"血红奇异果挞 x 1",misson:"制作委托：促销用的果挞"},
{type:"筹集委托",lv:"30",job:"烹调师",it_id:"fab8df700f2",it_no:"5",place:"太阳海岸",it_memo:"黑果醋 x 5",misson:"筹集委托：最高级的醋"},
{type:"批发委托",lv:"30",job:"烹调师",it_id:"166c5a80d72",it_no:"3",place:"太阳海岸",it_memo:"烤黑鳎 x 3",misson:"批发委托：为客人提供的料理"},
{type:"批发委托",lv:"30",job:"烹调师",it_id:"d2843fc31c7",it_no:"6",place:"利姆萨·罗敏萨",it_memo:"玉米粉 x 6",misson:"批发委托：替代用的玉米粉"},
{type:"制作委托",lv:"35",job:"烹调师",it_id:"45ece82148b",it_no:"1",place:"阿德内尔占星台",it_memo:"奶酪蛋奶酥 x 1",misson:"制作委托：宴会上的蛋奶酥"},
{type:"制作委托",lv:"35",job:"烹调师",it_id:"0202eb21927",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"酸泡菜 x 1",misson:"制作委托：长期航海用的酸泡菜"},
{type:"筹集委托",lv:"35",job:"烹调师",it_id:"c2af82c545e",it_no:"1",place:"阿德内尔占星台",it_memo:"骑士面包 x 1",misson:"筹集委托：面向占星台的面包"},
{type:"批发委托",lv:"35",job:"烹调师",it_id:"b31080aad5b",it_no:"3",place:"阿德内尔占星台",it_memo:"韭菜洋葱汤 x 3",misson:"批发委托：暖身汤"},
{type:"批发委托",lv:"35",job:"烹调师",it_id:"59ecddfe56e",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"橡果饼干 x 3",misson:"批发委托：长期航海用的饼干"},
{type:"制作委托",lv:"40",job:"烹调师",it_id:"66ae81c008d",it_no:"1",place:"白云崖前哨",it_memo:"油炸盐渍鳕鱼丸 x 1",misson:"制作委托：面向骑兵团的便携食品"},
{type:"制作委托",lv:"40",job:"烹调师",it_id:"296fdb127e2",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"牛肉干 x 1",misson:"制作委托：长期航海用的肉干"},
{type:"筹集委托",lv:"40",job:"烹调师",it_id:"eba063ee352",it_no:"5",place:"白云崖前哨",it_memo:"罗兰莓奶酪 x 5",misson:"筹集委托：为神殿骑士提供的奶酪"},
{type:"批发委托",lv:"40",job:"烹调师",it_id:"4cd55a5d4b3",it_no:"3",place:"白云崖前哨",it_memo:"鱼糕 x 3",misson:"批发委托：庆祝用的点心"},
{type:"批发委托",lv:"40",job:"烹调师",it_id:"3cc6d9ce0b6",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"苹果汁 x 3",misson:"批发委托：晶亮苹果汁"},
{type:"批发委托",lv:"45",job:"烹调师",it_id:"48f0e754a66",it_no:"3",place:"利姆萨·罗敏萨",it_memo:"拉诺西亚吐司 x 3",misson:"批发委托：招待吉吉卢恩用的菜肴"},
{type:"制作委托",lv:"45",job:"烹调师",it_id:"e979df3a51d",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"香草茶 x 1",misson:"制作委托：休息时供给的健康茶"},
{type:"制作委托",lv:"45",job:"烹调师",it_id:"702014863f4",it_no:"1",place:"利姆萨·罗敏萨",it_memo:"辛辣蛋 x 1",misson:"制作委托：招待梅梅卢恩用的菜肴"},
{type:"筹集委托",lv:"45",job:"烹调师",it_id:"0ece1c56c43",it_no:"1",place:"圣寇伊纳克调查地",it_memo:"王冠蛋糕 x 1",misson:"筹集委托：伊修加德风味庆祝用蛋糕"},
{type:"批发委托",lv:"45",job:"烹调师",it_id:"4888652a73c",it_no:"3",place:"圣寇伊纳克调查地",it_memo:"番茄派 x 3",misson:"批发委托：拉姆布鲁斯喜欢的食物"}
]