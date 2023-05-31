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
                        "organizer": "ACM",
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
                        "organizer": "ACM",
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
        "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwODNkZDU5ODE2NzNmNjYxZmRlOWRhZTY0NmI2ZjAzODBhMDE0NWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1ODgwOTI5MjQ3OTItcG4xOTlhN2lwcDUwNXAzaWx1MWszZDFlbnR0bmx2dnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1ODgwOTI5MjQ3OTItcG4xOTlhN2lwcDUwNXAzaWx1MWszZDFlbnR0bmx2dnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMwMzM0MzEwNzE4MTM0MTcxMzUiLCJoZCI6ImcudWNsYS5lZHUiLCJlbWFpbCI6InNlYW50YW5nMDAxQGcudWNsYS5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InNLaUc4NUxGSVRidElJYldDeW1tc0EiLCJub25jZSI6ImZvb2JhIiwibmFtZSI6IlNFQU4gVEFORyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjRmRZTU9mZk94ZktJb0VkX1pLT3Zqd3NwWmRKUVZMcXVkMWVzOT1zOTYtYyIsImdpdmVuX25hbWUiOiJTRUFOIiwiZmFtaWx5X25hbWUiOiJUQU5HIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2ODU1MTI5MTUsImV4cCI6MTY4NTUxNjUxNSwianRpIjoiZmNiNmE5NjIzOWVmMDcxMDU0NmU4NGI3ODJjNDZlN2NiZTM2MGRlNCJ9.XPpNo59slmNCwgoo1zj3I0a9LddjB0Jpe2m1qr9gW1iHAuPjNfrIbac8O2feT0mCwrZNlJXyoRk9CydCZoms-RkbqH7RHnUeuz8ysGGEaKMzamzV6jDnwQS2KugUkH2HcMGcb3E40KsNgH9scnc--dHMe8gdDQnEMQMv6lNxWkLgzAOvxbYUgX0nYeBODZvfLQzhsUxtZjbUXa_AV7vbBIZjAlzzYd8Eiw5gFbnPttez5EjRA6LoUbdSWAl_vHZgJIwK_qiBL6-dFWXabUZZP1u_2FYJb4Qmvk5qW9nXXoaJsBPJ77UIiGR5wYaZ339Wbc0sT-clkJUeJ9a8U5YJrQ"
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

