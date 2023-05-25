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
    b = apiz.get("http://127.0.0.1:2902/auth/test", headers=headers)
    print(b)
    print(b.content)

def test_oauth_new():
    apiz = requests.session()

    data = {
        "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWE1ZWY1YjEyNjIzYzkxNjcxYTcwOTNjYjMyMzMzM2NkMDdkMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1ODgwOTI5MjQ3OTItcG4xOTlhN2lwcDUwNXAzaWx1MWszZDFlbnR0bmx2dnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1ODgwOTI5MjQ3OTItcG4xOTlhN2lwcDUwNXAzaWx1MWszZDFlbnR0bmx2dnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQxNzAyMDc3ODYzMDk3NTEwMzciLCJlbWFpbCI6InNlYW50YW5nMDAxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiV0FHTmlnazdIQThzYldObmNTajV3dyIsIm5vbmNlIjoiZm9vYmEiLCJuYW1lIjoiU2VhbiBUYW5nIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGZ3b1EzZjJvU2U0LW9aTDgxemp4Q0J3ckFIUF9acDZKN25QT01sPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNlYW4iLCJmYW1pbHlfbmFtZSI6IlRhbmciLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY4NTAxMjMxNiwiZXhwIjoxNjg1MDE1OTE2LCJqdGkiOiJmNTA1NDFlNmJmMGM5YzAzOGQ2YWJhODNhZTA2MGMwZGI1MjNmYmU3In0.z_8U9Wde3z2oE4UM_CTC3iwPydSBx2fA32CfWP_bApJikgmLp1Vb7YXTFJ8NmPBNstNqt0ln4mgB_BHxB8tW9KbosbDPe4ymh2sQl9vjxW98Eve1pnxReJk9P9Y3naCd0rZL8TsemzNaw8jWyeU6QLwtuhTNr7evmx6QMDa-1GzZeagFtEQ0-OtPtB6fTD_rTLOMwTqTp1sQJu23FBwEZiMeyo-HdGRSMwKSy3hvvPzXhT2Brqg4MQsenAvfJyfaBZck1yF64TRWx-H_HD2ekkSKr4-4eTYJf3FKfmWNTUI-YnhwaLbdhYsRYftzDaRG5U_w3fkVuxOHbglNC5ZoGA"
        }


    b = apiz.post("http://127.0.0.1:2902/auth/verify_token", json=data)
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

