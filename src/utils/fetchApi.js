import deepAssign from "deep-assign";
import axios from "axios";
import store from "../../store/store";

export const FetchAPI = {
    getAPI: (url, body = null, options = {}) => { 
        return fetchJSONAPI(url, "GET", body, options)
    },

    putAPI: (url, body = null, options = {}) => { 
        return fetchJSONAPI(url, "PUT", body, options)
    },

    postAPI: (url, body = null, options = {}) => {  
        return fetchJSONAPI(url, "POST", body, options)
    },

    deleteAPI: (url, body = null, options = {}) => {
        return fetchJSONAPI(url, "DELETE", body, options)   
    }
}

export function setBody(url, method, body = null, options = {}) {
    const _options = deepAssign({}, options, {
      data: body,
      method,
      responseType: "json",
      url,
      headers: {
        'Accept': 'application/json',      //http请求报头
        "Content-Type": "application/json" //http实体报头
      }
    }); 
    return _options;
}

async function fetchJSON(url, method = "GET", body = null, options = {}) {
    const requestBody = setBody(url, method, JSON.stringify(body), options);
    var result = {
      error: false,
      statusText: "",
      status: 0,
      data: [], 
      message: [] //for other msg type
    };
   
  
    const res = await axios(requestBody)
      .then(response => { 
        console.log('res:', response);
        let dataIsArray  = (response.data instanceof Array);
        result.status = response.status;
        // result.page = { 
        //   pageCount :response.data.PageCount,
        //   pageIdx : response.data.PageIndex,
        //   pageSize : response.data.PageSize,
        //   totalCount : response.data.TotalCount 
        // }; 
        result.data = Object.assign( dataIsArray? []:{}, response.data);
        result.statusText = response.statusText; 
        // result.message = Object.assign([], response.data.Messages);
        // result.error = !response.data.OK;
        return result;
      })
      .catch(error => {
        const httpError = { 
          statusCode: error.response ? error.response.status : 404,
          message: error.message || 'Error',
          error: true
        };
  
        return Promise.reject(
          httpError
        );
      });
  
    return res;
}

async function fetchJSONAPI(
    url, 
    method = "GET", 
    body, 
    options = {}
){
    const apiToken = "A2007A57DDB3EBD0AB45B2EF75DB7449E837FD20B734E837371C76197F3057AC"; 
    // const apiToken = store.getState().user.apiKey; //用户登录成功后台返回Token,保存在redux中
    console.log('apiToken:',apiToken);
    const AuthenticationHeader = {
        headers: { "X-Authentication-Token": apiToken }
    };

    return fetchJSON(url, method, body, AuthenticationHeader);
}

export { fetchJSON, fetchJSONAPI };