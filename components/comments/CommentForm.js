import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Input, Button } from 'antd';
import Link from 'next/link';

const { TextArea } = Input;

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  // const roleBasedComment = () => {
  //   if (
  //     auth?.user?.role === 'Admin' ||
  //     auth?.user?.role === 'Author' ||
  //     auth?.user?.role === 'Subscriber'
  //   ) {
  //     return (
  //       <div>
  //         <p>Write a comment</p>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <p>Sign up to comment</p>
  //       </div>
  //     );
  //   }
  // };

  const roleBasedComment = () => {
    if (auth?.user === null && auth?.token === '') {
      return (
        <div className="neo-comment">
          <strong>
            <Link href={`/signup`}>
              <a style={{}}>Sign up for free</a>
            </Link>{' '}
            to join this conversation on Onur Taskiran Blog Website. Already
            have an account?{' '}
            <Link href={`/signin`}>
              <a>Sign in to comment</a>
            </Link>
          </strong>
        </div>
      );
    } else {
      return (
        <div>
          <strong>Add a comment</strong>
        </div>
      );
    }
  };

  return (
    <>
      {roleBasedComment()}
      <br />
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment here..."
        rows="4"
        disabled={auth?.user === null && auth?.token === ''}
        maxLength={200}
      />
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={comment === ''}
        style={{ marginTop: 4 }}
        type="primary"
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
