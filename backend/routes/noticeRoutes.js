const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/noticeController");

router.get("/", auth, ctrl.getNotices);
router.post("/", auth, ctrl.createNotice);
router.put("/:id", auth, ctrl.updateNotice);
router.delete("/:id", auth, ctrl.deleteNotice);

module.exports = router;
