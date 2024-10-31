import { User } from '../db/index.js'  // must be imported for database connection

export default function verify(req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    User.findById({_id: req.user._id})
      .then((isFound) => {
        if (!isFound) { 
          console.error(`SERVER :: INTERNAL :: User #${req.user._id} does not exist.`);
          res.redirect('/')
        }
        next();
      })
      .catch((error) => {
        console.error('SERVER :: INTERNAL :: Failure to authenticate.');
      })
  }
}