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
                "url":"/8fc1e95c-3ce5-4167-a75d-3accc5403c1c",
                "data":"",
                "response":200
            },
            {
                "type":"get",
                "url":"/44df4b3d-2ea8-4334-b836-0bd8e64c2aec",
                "data":"",
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
    for i in end_points.keys():
        for x in end_points[i]:
            if (x["type"] == "post"):
                # print(url+i+x["url"])
                # print(x["data"])
                response = requests.post(url+i+x["url"], data=json.dumps(x["data"]),  headers={"Content-Type": "application/json"})
                # print(response.json())
            if (x["type"] == "get"):
                try:
                    print(x)
                    response = requests.get(url+i+x["url"], data=x["data"])
                    print(response.json())
                except KeyError:
                    continue
            if (response.status_code != x["response"]):
                print("test failed for following test case at endpoint: " + i)
                print(x)
                print(response.json())
    print("passed all test")
    return 1

if __name__ == "__main__":
    test_client()