/*
tags: {
          type: Array,
          validate: {
              validator: function (v) {
                  return v.length > 0;
              },
              message: 'A course should have at least one tag'
          }
      },
profiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
      }],
      type: [String],
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: "gggggggggg"
        }
    },
*/

/*
async function addUser(data) {
    const newUser = new User(data);
    try {
        const result = await newUser.save()
        console.log(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}
addUser(data);

async function getAllUsers() {
    const allUsers = await User
        .find();
    //console.log(allUsers);
}
getAllUsers();

async function getUser(id) {
    const user = await User
        .find({
            email: id
        })
    console.log(user[0]["name"]["firstName"]);
}
getUser(id);


async function UpdateUser(id, modifieddata) {
    const user = await User.update({
        email: id
    }, {
        $set: modifieddata
    });
    console.log(user);
}
UpdateUser(id,newdata)*/