/**
 *    Copyright 2009-2017 Wudao Software Studio(wudaosoft.com)
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
package com.wudaosoft.traintickets.net;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.http.Header;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.protocol.HttpContext;

/**
 * 设置请求头并按规则排序
 * 
 * @author changsoul.wu
 *
 */
public class Rails12306IEHeadersInterceptor implements HttpRequestInterceptor {

	private final HostConfig hostConfig;
	private final List<String> sortKeyList;

	public Rails12306IEHeadersInterceptor(HostConfig hostConfig) {
		this.hostConfig = hostConfig;

		sortKeyList = new LinkedList<String>();
		sortKeyList.add("Host");
		sortKeyList.add("Connection");
		sortKeyList.add("Content-Length");
		sortKeyList.add("Pragma");
		sortKeyList.add("Cache-Control");
		sortKeyList.add("Accept");
		sortKeyList.add("Origin");
		sortKeyList.add("X-Requested-With");
		sortKeyList.add("User-Agent");
		sortKeyList.add("Content-Type");
		sortKeyList.add("Referer");
		sortKeyList.add("Accept-Encoding");
		sortKeyList.add("Accept-Language");
		sortKeyList.add("Cookie");
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.apache.http.HttpRequestInterceptor#process(org.apache.http.
	 * HttpRequest, org.apache.http.protocol.HttpContext)
	 */
	@Override
	public void process(HttpRequest request, HttpContext context) throws HttpException, IOException {
		if (!request.containsHeader("Accept")) {
			request.addHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		}

		request.addHeader("Accept-Language", "zh-CN,zh;q=0.8,ja;q=0.6,en;q=0.4");
		request.addHeader("Cache-Control", "no-cache");
		request.addHeader("Pragma", "no-cache");

		if (request.containsHeader("X-Requested-With")) {
			if (request instanceof HttpUriRequest && HttpPost.METHOD_NAME.equals(((HttpUriRequest) request).getMethod())) {
				request.setHeader("Accept", "application/json, text/javascript, */*; q=0.01");
				request.setHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				request.addHeader("Origin", hostConfig.getHostUrl());
			} else {
				request.setHeader("Accept", "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01");
			}
		}

		if (!request.containsHeader("Referer") && hostConfig.getReferer() != null) {
			request.addHeader("Referer", hostConfig.getReferer());
		}
		request.setHeader("User-Agent", hostConfig.getUserAgent());

		// List<Header> headers = Arrays.asList(request.getAllHeaders());
		//
		// Comparator<Header> comp = new Comparator<Header>() {
		//
		// @Override
		// public int compare(Header paramT1, Header paramT2) {
		// return paramT1.getName().compareTo(paramT2.getName());
		// }
		// };
		//
		// Collections.sort(headers, comp);
		// request.setHeaders(headers.toArray(new Header[headers.size()]));

		copyAndSet(sortKeyList, request);
	}

	protected void copyAndSet(List<String> sortKeyList, HttpRequest request) {

		if (sortKeyList == null)
			return;

		List<Header> newList = new ArrayList<Header>(30);

		for (String key : sortKeyList) {

			for (final HeaderIterator i = request.headerIterator(key); i.hasNext();) {

				newList.add(i.nextHeader());
			}
		}

		if (!newList.isEmpty()) {
			request.setHeaders(newList.toArray(new Header[newList.size()]));
		}
	}

}
