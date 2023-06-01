import time
import requests, json
import jwt


url="http://localhost:2902"

end_points =  {
    "/attend":
        [
            {
                "type":"post",
                "url":"/",
                "data":
                    {
                        "user": "foobar",
                        "uuid": "44df4b3d-2ea8-4334-b836-0bd8e64c2aeb"
                    },
                "response":400
            },
            {
                "type":"post",
                "url":"/",
                "data":
                    {
                        "uuid": "44df4b3d-2ea8-4334-b836-0bd8e64c2aeb"
                    },
                "response":400
            }
        ],
    "/event":
        [
            {
                "type":"get",
                "url":"/44df4b3d-2ea8-4334-b836-0bd8e64c2aeb",
                "response":200
            },
            {
                "type":"get",
                "url":"/44df4b3d-2ea8-4334-b836-0bd8e64c2aec",
                "response":400
            },
            {
                "type":"post",
                "url":"/new",
                "data":
                    {
                        "zip": 94588,
                        "type":  3,
                        "date": 20201212,
                        "description": "test description",
                        "title": "test title"
                    },
                "response":200
            },
            {
                "type":"post",
                "url":"/new",
                "data":
                    {
                        "zip": 94588,
                        "type":  3,
                        "date": 20201212,
                        "description": "test description"
                    },
                "response":400
            }
        ],       
    "/events":
            [
                {
                    "type":"get",
                    "url":"/",
                    "data":
                        {
                            "organizer":"ACM",
                            "zip":94588,
                            "type":3,
                            "after":12310,
                            "before":12314,
                            "search":"test search"
                        },
                    "response":200
                },
                {
                    "type":"get",
                    "url":"/",
                    "data":
                        {
                            "organizer":"ACM",
                            "zip":94588,
                            "type":3,
                            "after":12310,
                            "before":12314
                        },
                    "response":200
                }
            ]
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
        "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2ODU1NzUxNDAsImF1ZCI6IjU4ODA5MjkyNDc5Mi1vM2gwOXF2NWRjNWpybTRsODB0Z2RqcDYya3I5ZTYwZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNDE3MDIwNzc4NjMwOTc1MTAzNyIsImVtYWlsIjoic2VhbnRhbmcwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjU4ODA5MjkyNDc5Mi1vM2gwOXF2NWRjNWpybTRsODB0Z2RqcDYya3I5ZTYwZy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJTZWFuIFRhbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0ZndvUTNmMm9TZTQtb1pMODF6anhDQndyQUhQX1pwNko3blBPTWw9czk2LWMiLCJnaXZlbl9uYW1lIjoiU2VhbiIsImZhbWlseV9uYW1lIjoiVGFuZyIsImlhdCI6MTY4NTU3NTQ0MCwiZXhwIjoxNjg1NTc5MDQwLCJqdGkiOiIxNjM1ODBkN2M5NDQ2ZmNkYWUyYzNkNDc2MmY3YTZlOGIwNDA3ZmIyIn0.PnlAVIZYBDChogpZyODngf7mcCrJQ8tholiTaYXj0bDyWx8pn3EAmokV1Qp7y31077odfy573UORXx5yrA0BvABVS2smiBugWCIhdwkJEhKRV4XStAqdd23G96yOyV65SDwPv4tsjk6_RivhKV5EGjVtZwIqMlAxrjU9cl7ROqXMyv7RaGEyh3WLU_ygOSm8OQmS9hd8aAATixtPn6oCfTUoP2LkUubo68d_XUuiWjEioW3exRAhV1oPo5t-iOBFvgQQ1GmCVDTkJOisLHMJjWGuo6AYQotxx5qa3Ho8eWYzH3VmquGufd6MRuXqCc7kJV_39XRP1Kdh9OUi2WKdeg"
        }


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
            if (response.status_code != x["response"]):
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

