import time
import requests, json
import jwt


url="http://localhost:2902"

end_points =  {
    "/like":
        [
            {
                "type":"post",
                "url":"/",
                "data":
                    {
                        "uuid": "8fc1e95c-3ce5-4167-a75d-3accc5403c1c",
                        "like": 0
                    },
                "response":200
            },
            {
                "type":"post",
                "url":"/",
                "data":
                    {
                        "uuid": "8fc1e95c-3ce5-4167-a75d-3accc5403c1d",
                        "like": 0
                    },
                "response":400
            }
        ],
    # "/attend":
    #     [
    #         {
    #             "type":"post",
    #             "url":"/",
    #             "data":
    #                 {
    #                     "user": "foobar",
    #                     "uuid": "44df4b3d-2ea8-4334-b836-0bd8e64c2aeb"
    #                 },
    #             "response":400
    #         },
    #         {
    #             "type":"post",
    #             "url":"/",
    #             "data":
    #                 {
    #                     "uuid": "44df4b3d-2ea8-4334-b836-0bd8e64c2aeb"
    #                 },
    #             "response":400
    #         }
    #     ],
    # "/event":
    #     [
    #         {
    #             "type":"get",
    #             "url":"/44df4b3d-2ea8-4334-b836-0bd8e64c2aeb",
    #             "response":200
    #         },
    #         {
    #             "type":"get",
    #             "url":"/44df4b3d-2ea8-4334-b836-0bd8e64c2aec",
    #             "response":400
    #         },
    #         {
    #             "type":"post",
    #             "url":"/new",
    #             "data":
    #                 {
    #                     "zip": 94588,
    #                     "type":  3,
    #                     "date": 20201212,
    #                     "description": "test description",
    #                     "title": "test title"
    #                 },
    #             "response":200
    #         },
    #         {
    #             "type":"post",
    #             "url":"/new",
    #             "data":
    #                 {
    #                     "zip": 94588,
    #                     "type":  3,
    #                     "date": 20201212,
    #                     "description": "test description"
    #                 },
    #             "response":400
    #         }
    #     ],       
    # "/events":
    #         [
    #             {
    #                 "type":"get",
    #                 "url":"/",
    #                 "data":
    #                     {
    #                         "organizer":"ACM",
    #                         "zip":94588,
    #                         "type":3,
    #                         "after":12310,
    #                         "before":12314,
    #                         "search":"test search"
    #                     },
    #                 "response":200
    #             },
    #             {
    #                 "type":"get",
    #                 "url":"/",
    #                 "data":
    #                     {
    #                         "organizer":"ACM",
    #                         "zip":94588,
    #                         "type":3,
    #                         "after":12310,
    #                         "before":12314
    #                     },
    #                 "response":200
    #             }
    #         ]
    }



def test_client():    
    apiz = requests.session()
    for i in end_points.keys():
        for x in end_points[i]:
            if (x["type"] == "post"):
                # print(url+i+x["url"])
                # print(x["data"])
                response = requests.post(url+i+x["url"], data=json.dumps(x["data"]),  headers={"Content-Type": "application/json"})
            if (x["type"] == "get"):
                try:
                    response = requests.get(url+i+x["url"], data=x["data"])
                except KeyError:
                    continue
            if (response.status_code != x["response"]):
                print("test failed for following test case at endpoint: " + i)
                print(x)
                print(response.json())
    print("passed all test")
    return 1


def test_oauth_old():
    apiz = requests.session()
    headers = {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODQ4NzMyMTEsImV4cCI6MTY4NDg3NjgxMX0.u9O4aFa1MRuhJrQ0f5AK2Xntmw9A78mzpBLnz2s643c"}
    # headers = {"Authorization":""+a["token_type"]+" "+a["access_token"]+""}
    b = apiz.get("http://localhost:2512/auth/test", headers=headers)
    print(b)
    print(b.content)

def test_oauth_new():
    apiz = requests.session()

    data = {
        "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODU1ODg2ODMsImF1ZCI6IjU4ODA5MjkyNDc5Mi1vM2gwOXF2NWRjNWpybTRsODB0Z2RqcDYya3I5ZTYwZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNDE3MDIwNzc4NjMwOTc1MTAzNyIsImVtYWlsIjoic2VhbnRhbmcwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjU4ODA5MjkyNDc5Mi1vM2gwOXF2NWRjNWpybTRsODB0Z2RqcDYya3I5ZTYwZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJTZWFuIFRhbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZndvUTNmMm9TZTQtb1pMODF6anhDQndyQUhQX1pwNko3blBPTWw9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2VhbiIsImZhbWlseV9uYW1lIjoiVGFuZyIsImlhdCI6MTY4NTU4ODk4MywiZXhwIjoxNjg1NTkyNTgzLCJqdGkiOiI3ODE4NTJjNGZhYjAwZjlmMzU0ZjNhMGI2YmY2ZTQxZWVkYTNlODY1In0.F_6mlA5q4TKVZJbOH5SGbkyz0fq_nKDFPHT8PuVJjXVqXAPzYHViM6SGQokmFq0zTUOaOU40cUD0SSIU7UaUPDtRsgEcxxpH_YXTqmRkz681v8AnV3fAy5_QP63f-e82nSQkbNl8GvJVYRywHtuPQm1Wi_FBQDNYfIwK_2PySdl6WWzHwJYuQjagHIkWEa4p2SmyQtIzubVfrsLRUlOzlx4rGpNMjKa5aTFuqNDsqsryZsFswd9Web0h6MWTf93aWtvg65jcs6rrslGDRg4yWa1gL7ONBs17vn0-SpytEq1XASLpPUqRajcYhYHqidQXObLizopLugTXoTkI82Zohw"
        }
    
    # data = {
    #     "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODU1ODg5NzYsImF1ZCI6IjU4ODA5MjkyNDc5Mi1vM2gwOXF2NWRjNWpybTRsODB0Z2RqcDYya3I5ZTYwZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwODA4MjA3Njc2Mjc4MDM3NjgyMSIsImVtYWlsIjoic2VhbnRhbmcwNTE2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI1ODgwOTI5MjQ3OTItbzNoMDlxdjVkYzVqcm00bDgwdGdkanA2MmtyOWU2MGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiU2VhbiBUYW5nIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGRiQ2NlVHJKdThMWFE0Qk5VWUMydmVoWkN4RHRWby1vajZoaDBLPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNlYW4iLCJmYW1pbHlfbmFtZSI6IlRhbmciLCJpYXQiOjE2ODU1ODkyNzYsImV4cCI6MTY4NTU5Mjg3NiwianRpIjoiZDBkNTJjYzI4OTA2NjU5YzRjOTljOTAzMzk0MTQ0MDgwMDZlM2IxYSJ9.meY0-ONLPEGD49BqFZV4zcAwRFHg3xWCfns8yX6slreIHHEAYdL53bAWhLhCQzR0Wlgp2oJ5ghzrVXP0dlcMBgQP35pbH37Vm-dHHzvhNKGUTRVU51ifLjaO4ac3_BIWR917P4piocI7fFgKeo5MtJCbn5zX8Q9CN6EI6-EZS7Z3UP_OaZeU7Raytv9Bz6umS6NPcu7qFXfN3FSKqTcmuVvDyezsc_gsn5rkAjJGIoRZZYmYFClpozMOx8iB9vl1bBjEERF-vDVLWo7JhPDdgNFsKyQO-qvPnlyMDi99aRiceyp3CwRL-D4OEDMAeN9ZwIBV4Owmt94HUhCmdnS_HQ"
    #     }
    
    # data = {
    #     "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODU1ODk5NzUsImF1ZCI6IjU4ODA5MjkyNDc5Mi1vM2gwOXF2NWRjNWpybTRsODB0Z2RqcDYya3I5ZTYwZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzAzMzQzMTA3MTgxMzQxNzEzNSIsImhkIjoiZy51Y2xhLmVkdSIsImVtYWlsIjoic2VhbnRhbmcwMDFAZy51Y2xhLmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI1ODgwOTI5MjQ3OTItbzNoMDlxdjVkYzVqcm00bDgwdGdkanA2MmtyOWU2MGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiU0VBTiBUQU5HIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGNGZFlNT2ZmT3hmS0lvRWRfWktPdmp3c3BaZEpRVkxxdWQxZXM5PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNFQU4iLCJmYW1pbHlfbmFtZSI6IlRBTkciLCJpYXQiOjE2ODU1OTAyNzUsImV4cCI6MTY4NTU5Mzg3NSwianRpIjoiOWNkNjEyY2RjNzM4YzZmOGRiNWI3ZjIzM2EyYjU2MWRhMGMzYjNlZCJ9.ib2s8_XsU1lud-Jk-qDmp2eQn1-jmhz89PwJuo93sMqQlbQVbMoykcrZq6tyQp_YiibvuFPWRF4XVZnu00c6Oh6vxrTk-0BrLbZt_SHa-K9v5q8pHhYYnkLHcGIuVe9A2GKzOZYS1eCKC_eEkWVB29qH3OKmm8OgeilBMwmb1h-a5R3neLsCXmlPCSbdfsaQ84tzjXtCkpd_5hqNDk3ZEyV_ESKVtIV9h9468atfD8q59n1D3sK5IzCKD9g63g9oWegegPx61gOUbTUoLvpDaHs7q2fQblFD3UwxlWl8MInkheB998WK2nXTtoRXqsG41yqP4NYKXkVpjHnY_CAH0A"
    #     }
    

    b = apiz.post("http://localhost:2902/auth/verify_token", json=data)
    b = b.json()
    print(type(b))
    print(b)
    headers = {"Authorization":"Bearer "+b["token"], "Content-Type": "application/json"}
    time.sleep(1)
    # headers = {"Authorization":""+a["token_type"]+" "+a["access_token"]+""}
    # b = apiz.get("http://127.0.0.1:2902/auth/test", headers=headers)
    # print(b)
    # print(b.content)

    for i in end_points.keys():
        for x in end_points[i]:
            if (x["type"] == "post"):
                # print(url+i+x["url"])
                # print(x["data"])
                response = requests.post(url+i+x["url"], data=json.dumps(x["data"]),  headers=headers)
            if (x["type"] == "get"):
                try:
                    response = requests.get(url+i+x["url"], data=x["data"], headers={"Authorization":"Bearer "+b["token"]})
                except KeyError:
                    continue
            if (response.status_code == x["response"]):
                print("test failed for following test case at endpoint: " + i)
                print(x)
                try:
                    print(response.json())
                except:
                    print(response)
    print("passed all tes while carrying jwtoken")
    return 1

    # # headers = {"Authorization":""+a["token_type"]+" "+a["access_token"]+""}
    # b = apiz.get("http://127.0.0.1:2902/auth/test", headers=headers)
    # print(b)
    # print(b.content)



if __name__ == "__main__":
    # test_client()
    test_oauth_new()

