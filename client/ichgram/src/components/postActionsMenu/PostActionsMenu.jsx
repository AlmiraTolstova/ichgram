import { Box, Button, Dialog, DialogContent, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  resetOpenPostActionMenu,
} from "../../redux/slices/userProfileSlice";
import { closeExistPostModal } from "../../redux/slices/postsSlice";

const PostActionsMenu = ({ isOwner, currentPost }) => {
  const dispatch = useDispatch();
  const openPostActionMenu = useSelector(
    (state) => state.profile.openPostActionMenu,
  );

  return (
    <Dialog
      open={openPostActionMenu}
      onClose={() => dispatch(resetOpenPostActionMenu())}
      PaperProps={{
        sx: {
          width: 400,
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {isOwner && (
          <>
            <Button
              fullWidth
              color="error"
              sx={{
                py: 2,
                borderRadius: 0,
                fontWeight: 700,
              }}
              onClick={() => {
                dispatch(deletePost(currentPost?._id));
                dispatch(closeExistPostModal());
              }}
            >
              Delete
            </Button>

            <Divider />

            <Button fullWidth sx={{ py: 2, borderRadius: 0 }}>
              Edit
            </Button>

            <Divider />

            <Button fullWidth sx={{ py: 2, borderRadius: 0 }}>
              Go to post
            </Button>

            <Divider />
          </>
        )}

        <Button fullWidth sx={{ py: 2, borderRadius: 0 }}>
          Copy link
        </Button>

        <Divider />

        <Button
          fullWidth
          sx={{ py: 2, borderRadius: 0 }}
          onClick={() => dispatch(resetOpenPostActionMenu())}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostActionsMenu;
