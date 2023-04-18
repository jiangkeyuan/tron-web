<template>
  <DashbordContent>
    <div class="feeeio-layout-content full">
		<div class="">
			<div class="p-4" data-v-531a4288="">
				<div class="common-form-container" data-v-531a4288="">
					<div class="md:w-247.5  mt-20" data-v-531a4288="">
						<h3 class="ant-typography" data-v-531a4288="">1.购买能量</h3>
						<div class="ant-typography" data-v-531a4288="">
							请求路径：http://api.energy.hashgo.xyz/index/order/submit
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							请求方式：POST
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							参数格式：JSON
							<!---->
						</div>
						<h5 class="ant-typography" data-v-531a4288="">
							请求header头
							<!---->
						</h5>
						<div>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">Content-Type</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">application/json</td>
											<td data-v-531a4288="">application/json</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								请求参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">申请的api-key</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalEnergyQuantity</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">租用能量数(10000起租)</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalHours</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">租用时长</td>
											<td data-v-531a4288="">小时为单位,1 小时或者其他 24 的倍数</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">receiveAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">接受地址</td>
											<td data-v-531a4288="">TJRk_**hCAY</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								响应参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">code</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">状态码</td>
											<td data-v-531a4288="">0</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">msg</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">响应说明</td>
											<td data-v-531a4288="">ok</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">object</td>
											<td data-v-531a4288="">数据详情结构</td>
											<td data-v-531a4288=""></td>
										</tr>

										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderNo</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单号</td>
											<td data-v-531a4288="">202xxxxx</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">申请的 apikey</td>
											<td data-v-531a4288="">****_****_****_***</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">fromAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">代理方地址</td>
											<td data-v-531a4288="">TJRk_**hCAY</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">toAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">接收方地址</td>
											<td data-v-531a4288="">TJRk***hCAY</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalQuantity</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">租用能量</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">doneRentalQuantity</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">已完成能量</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalHours</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">租用时长</td>
											<td data-v-531a4288="">72</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">payDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">支付日期</td>
											<td data-v-531a4288="">2001-01-01</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">delegateDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">代理日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">expiredDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">过期日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">price</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">出售单价</td>
											<td data-v-531a4288="">120</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">payAmount</td>
											<td data-v-531a4288="">Bigdecimal</td>
											<td data-v-531a4288="">支付金额</td>
											<td data-v-531a4288="">3.6</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderStatus</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单状态</td>
											<td data-v-531a4288="">代理中</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">transactionHash</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">交易 id</td>
											<td data-v-531a4288="">sadfsadfds</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">createDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">创建日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>



									</tbody>
								</table>
							</div>
							<h5 class="ant-typography" data-v-531a4288="">
								响应示例
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<pre class="code" data-v-531a4288="">
								<code data-v-531a4288="">
{
"code":0,
"msg":"ok",
"data":{
	
}
}
								</code>
							</pre>
							</div>

						</div>
					</div>



					<div class="md:w-247.5  mt-20" data-v-531a4288="">
						<h3 class="ant-typography" data-v-531a4288="">2.查询某笔订单</h3>
						<div class="ant-typography" data-v-531a4288="">
							请求路径：http://api.energy.hashgo.xyz/index/order/query
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							请求方式：GET
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							参数格式：JSON
							<!---->
						</div>
						<h5 class="ant-typography" data-v-531a4288="">
							请求header头
							<!---->
						</h5>
						<div>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">Content-Type</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">application/json</td>
											<td data-v-531a4288="">application/json</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								请求参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">申请的api-key</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderNo</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单号</td>
											<td data-v-531a4288="">202xxxxxx</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								响应参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">code</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">状态码</td>
											<td data-v-531a4288="">0</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">msg</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">响应说明</td>
											<td data-v-531a4288="">ok</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">object</td>
											<td data-v-531a4288="">订单详情结构</td>
											<td data-v-531a4288=""></td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderNo</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单号</td>
											<td data-v-531a4288="">202xxxxx</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">申请的 apikey</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">fromAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">代理方地址</td>
											<td data-v-531a4288="">TJRk**_hCAY</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">toAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">接收方地址</td>
											<td data-v-531a4288="">TJRk_**hCAY</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalQuantity</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">租用能量</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">doneRentalQuantity</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">已完成能量</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalHours</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">租用时长</td>
											<td data-v-531a4288="">72</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">payDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">支付日期</td>
											<td data-v-531a4288="">2001-01-01</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">delegateDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">代理日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">expiredDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">过期日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">price</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">出售单价</td>
											<td data-v-531a4288="">120</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">payAmount</td>
											<td data-v-531a4288="">Bigdecimal</td>
											<td data-v-531a4288="">支付金额</td>
											<td data-v-531a4288="">3.6</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderStatus</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单状态</td>
											<td data-v-531a4288="">代理中</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">transactionHash</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">交易 id</td>
											<td data-v-531a4288="">sadfsadfds</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">createDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">创建日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h5 class="ant-typography" data-v-531a4288="">
								响应示例
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<pre class="code" data-v-531a4288="">
								<code data-v-531a4288="">
{
"code":0,
"msg":"ok",
"data":{
	
}
}
								</code>
							</pre>
							</div>

						</div>
					</div>





					<div class="md:w-247.5  mt-20" data-v-531a4288="">
						<h3 class="ant-typography" data-v-531a4288="">3.查询apikey下的订单</h3>
						<div class="ant-typography" data-v-531a4288="">
							请求路径：http://api.energy.hashgo.xyz/index/order/list
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							请求方式：POST
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							参数格式：JSON
							<!---->
						</div>
						<h5 class="ant-typography" data-v-531a4288="">
							请求header头
							<!---->
						</h5>
						<div>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">Content-Type</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">application/json</td>
											<td data-v-531a4288="">application/json</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								请求参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">申请的api-key</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								响应参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">code</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">状态码</td>
											<td data-v-531a4288="">0</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">msg</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">响应说明</td>
											<td data-v-531a4288="">ok</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">object</td>
											<td data-v-531a4288="">订单详情结构</td>
											<td data-v-531a4288=""></td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderNo</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单号</td>
											<td data-v-531a4288="">202xxxxx</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">申请的 apikey</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">fromAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">代理方地址</td>
											<td data-v-531a4288="">TJRk**_hCAY</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">toAddress</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">接收方地址</td>
											<td data-v-531a4288="">TJRk_**hCAY</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalQuantity</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">租用能量</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">doneRentalQuantity</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">已完成能量</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">rentalHours</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">租用时长</td>
											<td data-v-531a4288="">72</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">payDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">支付日期</td>
											<td data-v-531a4288="">2001-01-01</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">delegateDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">代理日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">expiredDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">过期日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">price</td>
											<td data-v-531a4288="">Integer</td>
											<td data-v-531a4288="">出售单价</td>
											<td data-v-531a4288="">120</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">payAmount</td>
											<td data-v-531a4288="">Bigdecimal</td>
											<td data-v-531a4288="">支付金额</td>
											<td data-v-531a4288="">3.6</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderStatus</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单状态</td>
											<td data-v-531a4288="">代理中</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">transactionHash</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">交易 id</td>
											<td data-v-531a4288="">sadfsadfds</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">createDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">创建日期</td>
											<td data-v-531a4288="">2002-02-02</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h5 class="ant-typography" data-v-531a4288="">
								响应示例
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<pre class="code" data-v-531a4288="">
								<code data-v-531a4288="">
{
"code":0,
"msg":"ok",
"data":{
	
}
}
								</code>
							</pre>
							</div>

						</div>
					</div>

					<div class="md:w-247.5  mt-20" data-v-531a4288="">
						<h3 class="ant-typography" data-v-531a4288="">4.API 资源查询</h3>
						<div class="ant-typography" data-v-531a4288="">
							请求路径：http://api.energy.hashgo.xyz/index/api/query
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							请求方式：GET
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							参数格式：JSON
							<!---->
						</div>
						<h5 class="ant-typography" data-v-531a4288="">
							请求header头
							<!---->
						</h5>
						<div>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">Content-Type</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">application/json</td>
											<td data-v-531a4288="">application/json</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								请求参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">申请的api-key</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								响应参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">code</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">状态码</td>
											<td data-v-531a4288="">0</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">msg</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">响应说明</td>
											<td data-v-531a4288="">ok</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">object</td>
											<td data-v-531a4288="">订单详情结构</td>
											<td data-v-531a4288=""></td>
										</tr>

										<tr data-v-531a4288="">
											<td data-v-531a4288="">canRentalEnergy</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">还能租多少</td>
											<td data-v-531a4288="">10000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">todayTrxUsed</td>
											<td data-v-531a4288="">Bigdecimal</td>
											<td data-v-531a4288="">今天使用 trx</td>
											<td data-v-531a4288="">3.6</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">todayRentaledEnergy</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">今天租用能量</td>
											<td data-v-531a4288="">100000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">yesterdayTrxUsed</td>
											<td data-v-531a4288="">Bigdecimal</td>
											<td data-v-531a4288="">昨天使用 trx</td>
											<td data-v-531a4288="">3.6</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">yesterdayRentaledEnergy</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">昨天租用能量</td>
											<td data-v-531a4288="">100000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">totalTrxUsed</td>
											<td data-v-531a4288="">Bigdecimal</td>
											<td data-v-531a4288="">总使用 trx</td>
											<td data-v-531a4288="">7.2</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">totalRentaledEnergy</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">总租用能量</td>
											<td data-v-531a4288="">200000</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">createDate</td>
											<td data-v-531a4288="">Date</td>
											<td data-v-531a4288="">创建日期</td>
											<td data-v-531a4288="">2020-01-02</td>
										</tr>

									</tbody>
								</table>
							</div>
							<h5 class="ant-typography" data-v-531a4288="">
								响应示例
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<pre class="code" data-v-531a4288="">
								<code data-v-531a4288="">
{
"code":0,
"msg":"ok",
"data":{
	
}
}
								</code>
							</pre>
							</div>

						</div>
					</div>

					<div class="md:w-247.5  mt-20" data-v-531a4288="">
						<h3 class="ant-typography" data-v-531a4288="">5.查询平台可用资源</h3>
						<div class="ant-typography" data-v-531a4288="">
							请求路径：http://api.energy.hashgo.xyz/index/api/resource
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							请求方式：GET
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							参数格式：JSON
							<!---->
						</div>
						<h5 class="ant-typography" data-v-531a4288="">
							请求header头
							<!---->
						</h5>
						<div>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">Content-Type</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">application/json</td>
											<td data-v-531a4288="">application/json</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								请求参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">申请的api-key</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								响应参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">code</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">状态码</td>
											<td data-v-531a4288="">0</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">msg</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">响应说明</td>
											<td data-v-531a4288="">ok</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">object</td>
											<td data-v-531a4288="">订单详情结构</td>
											<td data-v-531a4288=""></td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">Long</td>
											<td data-v-531a4288="">平台可用资源</td>
											<td data-v-531a4288="">10000</td>
										</tr>
									</tbody>
								</table>
							</div>
							<h5 class="ant-typography" data-v-531a4288="">
								响应示例
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<pre class="code" data-v-531a4288="">
								<code data-v-531a4288="">
{
"code":0,
"msg":"ok",
"data":{
	
}
}
								</code>
							</pre>
							</div>
						</div>
					</div>
					<div class="md:w-247.5  mt-20" data-v-531a4288="">
						<h3 class="ant-typography" data-v-531a4288="">6.取消代理</h3>
						<div class="ant-typography" data-v-531a4288="">
							请求路径：http://api.energy.hashgo.xyz/index/api/undelegate
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							请求方式：POST
							<!---->
						</div>
						<div class="ant-typography" data-v-531a4288="">
							参数格式：JSON
							<!---->
						</div>
						<h5 class="ant-typography" data-v-531a4288="">
							请求header头
							<!---->
						</h5>
						<div>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">Content-Type</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">application/json</td>
											<td data-v-531a4288="">application/json</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								请求参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">apiKey</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">申请的api-key</td>
											<td data-v-531a4288="">****_****_****_****</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">orderNo</td>
											<td data-v-531a4288="">String</td>
											<td data-v-531a4288="">订单号</td>
											<td data-v-531a4288="">202xxxxxx</td>
										</tr>
									</tbody>
								</table>
							</div>

							<h5 class="ant-typography" data-v-531a4288="">
								响应参数
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<table class="table" data-v-531a4288="">
									<thead data-v-531a4288="">
										<tr data-v-531a4288="">
											<th data-v-531a4288="">参数名</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">参数类型</th>
											<th data-v-531a4288="">示例</th>
										</tr>
									</thead>
									<tbody data-v-531a4288="">
										<tr data-v-531a4288="">
											<td data-v-531a4288="">code</td>
											<td data-v-531a4288="">int</td>
											<td data-v-531a4288="">状态码</td>
											<td data-v-531a4288="">0</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">msg</td>
											<td data-v-531a4288="">string</td>
											<td data-v-531a4288="">响应说明</td>
											<td data-v-531a4288="">ok</td>
										</tr>
										<tr data-v-531a4288="">
											<td data-v-531a4288="">data</td>
											<td data-v-531a4288="">object</td>
											<td data-v-531a4288=""></td>
											<td data-v-531a4288=""></td>
										</tr>
									</tbody>
								</table>
							</div>
							<h5 class="ant-typography" data-v-531a4288="">
								响应示例
								<!---->
							</h5>
							<div class="overflow-auto" data-v-531a4288="">
								<pre class="code" data-v-531a4288="">
								<code data-v-531a4288="">
{
"code":0,
"msg":"ok",
"data":{
	
}
}
								</code>
							</pre>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </DashbordContent>
</template>
<script setup></script>
<style scoped>
.mt-20{
  margin-top:20px;
}
body,
td {
  font-family: 微软雅黑;
  font-size: 10pt;
}
.common-form-container {
  width: 100%;
  border-radius: 10px;
  background: #fff;
}
div.ant-typography,
.ant-typography p {
  margin:20px 0;
}
.ant-typography {
  color: #000000d9;
  overflow-wrap: break-word;
}
h3.ant-typography,
.ant-typography h3 {
  margin-bottom: 0.5em;
  color: #000000d9;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.35;
}
h5.ant-typography,
.ant-typography h5 {
  margin-bottom: 0.5em;
  color: #000000d9;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
}
.ant-typography {
  color: #000000d9;
  overflow-wrap: break-word;
}
.overflow-auto {
  overflow: auto;
}
.table[data-v-531a4288] {
  width: 100%;
  border-collapse: collapse;
}
.table tr[data-v-531a4288]:nth-of-type(even) {
  background-color: #f5f5f5;
}
.table th[data-v-531a4288],
.table td[data-v-531a4288] {
  padding: 1em;
  text-align: center;
  max-width: 200px;
  min-width: 150px;
  border: 0.5px solid black;
}
.table th[data-v-531a4288] {
  background-color: #ebf0f3;
}
.code[data-v-531a4288] {
  padding: 15px;
  background-color: #252526;
  color: #f5f5f5;
  overflow: auto;
  border-radius: 10px;
}
p[data-v-531a4288]:last-of-type {
  margin-bottom: 0;
}
@media screen and (max-width: 768px) {
  .table th[data-v-531a4288],
  .table td[data-v-531a4288] {
    padding: 6px;
    text-align: center;
    max-width: 10px;
    min-width: 50px;
    font-size: 12px;
    word-break: break-all;
  }
  .code[data-v-531a4288] {
    padding: 10px;
    max-height: none;
    font-size: 12px;
  }
}
typography + h5.ant-typography {
  margin-top: 1.2em;
}
.feeeio-layout-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
}
.ant-layout,
.ant-layout * {
  box-sizing: border-box;
}
</style>
