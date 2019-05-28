package com.ayit.syk.controller;

import com.ayit.syk.utils.HttpClientUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "search")
public class searchController {

    @RequestMapping(value = "/book/{queryName}",method = RequestMethod.GET)
    public String search(@PathVariable("queryName") String queryName){
        String url  = "https://api.zhuishushenqi.com/book/fuzzy-search?query="+queryName+"";
        String result = HttpClientUtils.doGet(url);
        System.out.println(result);
        return result;

    }

}
