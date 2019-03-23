import sys, json


def main():
    lines = sys.stdin.readlines()[0].replace('"',"").replace("\n","")
    x = [{
     "name": lines,
     "age": None,
    "city": "New York"
    }]
    y=json.dumps(x)
    #return the sum to the output stream
    print(y)

# Start process
if __name__ == '__main__':
    main()
