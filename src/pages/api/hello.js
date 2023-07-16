
import connectDB from '../../../middleware/mongodb'
import Test from '../../../models/testmongo'



const handler = async (req, res) => {
    if (req.method = "POST") {
        const {name, email} = req.body;
        const user = new Test({name, email});
        const usercreated = await user.save();
        return res.status(200).send(usercreated)
    }
}


export default connectDB(handler);

// export default async function addTest(req, res) {
//     try {
//       console.log('CONNECTING TO MONGO');
//       await connectDB();
//       console.log('CONNECTED TO MONGO');
//       console.log(req.body)
  
//       console.log('CREATING DOCUMENT');
//       const test = await Test.create(req.body);
//       console.log('CREATED DOCUMENT');
  
//       res.json({ test });
//     } catch (error) {
//       console.log(error);
//       res.json({ error });
//     }
//   }