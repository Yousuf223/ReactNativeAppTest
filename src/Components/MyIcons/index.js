import React from 'react';
import { View } from 'react-native';

// Import your SVG icons
import BackArrow from '../../Assets/Icons/back_arrow.svg';
import BackArrow2 from '../../Assets/Icons/back.svg';
import AmericanCard from '../../Assets/Icons/american-card.svg';
import ApplePay from '../../Assets/Icons/apple-pay.svg';
import AppleIcon from '../../Assets/Icons/apple.svg';
import CheckedMark from '../../Assets/Icons/checked.svg';
import DaysIcon from '../../Assets/Icons/days.svg';
import FacebookIcon from '../../Assets/Icons/facebook.svg';
import KeyIcon from '../../Assets/Icons/key-square.svg';
import Sms from '../../Assets/Icons/mail.svg';
import MasterCard from '../../Assets/Icons/master-card.svg';
import Media from '../../Assets/Icons/media.svg';
import MonthlyPackageIcon from '../../Assets/Icons/monthly-package.svg';
import Notifications from '../../Assets/Icons/notification.svg';
import Paypal from '../../Assets/Icons/paypal.svg';
import Profile from '../../Assets/Icons/profile.svg';
import Record from '../../Assets/Icons/record.svg';
import Sent from '../../Assets/Icons/sent.svg';
import Email from '../../Assets/Icons/sms.svg';
import Visa from '../../Assets/Icons/visa.svg';
import YearlyPackage from '../../Assets/Icons/yearly-package.svg';
import EyeIcon from '../../Assets/Icons/eye-icon.svg';
import SlashEyeIcon from '../../Assets/Icons/slash-eyeicon.svg';
import TickIcon from '../../Assets/Icons/tick-icon.svg';
import Tick2 from '../../Assets/Icons/tick2.svg';
import CrossIcon from '../../Assets/Icons/cross-icon.svg';
import AlertIcon from '../../Assets/Icons/alert-icon.svg';
import AddPrimary from '../../Assets/Icons/add_primary.svg';
import Calendar from '../../Assets/Icons/calendar.svg';
import Album from '../../Assets/Icons/album.svg';
import Home from '../../Assets/Icons/home.svg';
import PlusPrimary from '../../Assets/Icons/plus_primary.svg';
import PlusSecondary from '../../Assets/Icons/plus_secondary.svg';
import Settings from '../../Assets/Icons/settings.svg';
import Terms from '../../Assets/Icons/terms.svg';
import Upload from '../../Assets/Icons/upload.svg';
import Wallet from '../../Assets/Icons/wallet.svg';
import SwitchA from '../../Assets/Icons/switch_a.svg';
import SwitchB from '../../Assets/Icons/switch_b.svg';
import SwitchC from '../../Assets/Icons/switch_c.svg';
import SwitchD from '../../Assets/Icons/switch_d.svg';
import Cross from '../../Assets/Icons/cross.svg';
import Camera from '../../Assets/Icons/camera.svg';
import Key from '../../Assets/Icons/key.svg';
import TabsBg from '../../Assets/Icons/tabsbg.svg';
import TabsHome from '../../Assets/Icons/tabshome.svg';
import TabsAdd from '../../Assets/Icons/tabs_add.svg';
import Subject from '../../Assets/Icons/subject.svg';
import CallPhone from '../../Assets/Icons/call_phone.svg';
import Heart from '../../Assets/Icons/heart.svg';
import Like from '../../Assets/Icons/like.svg';
import Comment from '../../Assets/Icons/comment.svg';
import Checked from '../../Assets/Icons/checked.svg';
import Add from '../../Assets/Icons/add.svg';
import Request from '../../Assets/Icons/request.svg';
import Search from '../../Assets/Icons/search.svg';
import Menu from '../../Assets/Icons/menu.svg';
import Hi from '../../Assets/Icons/hello.svg';
import GroupFiles from '../../Assets/Icons/group-file.svg';
import FilePicker from '../../Assets/Icons/file.svg';
import Mic from '../../Assets/Icons/mic.svg';
import VideoIcon from '../../Assets/Icons/vido.svg';
import AttachFileIcon from '../../Assets/Icons/attach-file.svg';
import ColourPicker from '../../Assets/Icons/colour-picker.svg';
import StarIcon from '../../Assets/Icons/star-icon.svg';
import DownArrow from '../../Assets/Icons/down-arrow.svg';
import JournalBlue from '../../Assets/Icons/journal-blue.svg';
import HomeBlue from '../../Assets/Icons/home-blue.svg';
import MediaBlue from '../../Assets/Icons/media-blue.svg';
import CalendarBlue from '../../Assets/Icons/calendar-blue.svg';
import Close from '../../Assets/Icons/close.svg';
import JournalIconI from '../../Assets/Icons/journal_iconI.svg';
import JournalIconII from '../../Assets/Icons/journal_iconII.svg';
import RightArrow from '../../Assets/Icons/right_arrow.svg';
import LeftArrow from '../../Assets/Icons/left_arrow.svg';
import Share from '../../Assets/Icons/share.svg';
import Minus from '../../Assets/Icons/minus.svg';
import PauseControl from '../../Assets/Icons/pause-control.svg';
import Pause from '../../Assets/Icons/pause.svg';
import Play from '../../Assets/Icons/play.svg';
import Insert from '../../Assets/Icons/insert.svg';
import Bold from '../../Assets/Icons/bold.svg';
import Italic from '../../Assets/Icons/italic.svg';
import Bullet from '../../Assets/Icons/bullet.svg';
import Closed from '../../Assets/Icons/closed.svg';
import Cameras from '../../Assets/Icons/cameras.svg';
import Gallery from '../../Assets/Icons/gallery.svg';
import JournalIconIII from '../../Assets/Icons/journal_iconIII.svg';
import JournalIconIV from '../../Assets/Icons/journal_iconIV.svg';
import JournalIconV from '../../Assets/Icons/journal_iconV.svg';
import Logo from '../../Assets/Icons/logo.svg';
import Activities from '../../Assets/Icons/activities.svg';
import Steps from '../../Assets/Icons/steps.svg';
import Partners from '../../Assets/Icons/partners.svg';
import Female from '../../Assets/Icons/female.svg';
import Male from '../../Assets/Icons/male.svg';
import Other from '../../Assets/Icons/other.svg';
import BackIcon from '../../Assets/Icons/backicon.svg';
// Drawer Icons Habit Tracker
import CalorieCounter from '../../Assets/Icons/calorie-counter.svg';
import BodyMeasurements from '../../Assets/Icons/body-measurements.svg';
import Breathing from '../../Assets/Icons/breathing.svg';
import StepCounter from '../../Assets/Icons/step-counter.svg';
import MyPurchases from '../../Assets/Icons/my-purchases.svg';
import WaterIntake from '../../Assets/Icons/water-intake.svg';
import WorkoutPlan from '../../Assets/Icons/workout-plan.svg';
import TrackChallenges from '../../Assets/Icons/track.svg';
import AI from '../../Assets/Icons/AI.svg';
import PremiumIcon from '../../Assets/Icons/premium.svg';
import checkmark from '../../Assets/Icons/checkmark.svg';
import Alert2 from '../../Assets/Icons/alert2.svg';
import time from '../../Assets/Icons/time.svg';
import plusbutton from '../../Assets/Icons/plusbutton.svg';
import rightbutton from '../../Assets/Icons/rightbutton.svg';
import Celebrate from '../../Assets/Icons/celebrate.svg';
import PauseInhale from '../../Assets/Icons/pause-inhale.svg';
import PlayInhale from '../../Assets/Icons/play-inhale.svg';
import Setting from '../../Assets/Icons/settings_icon.svg';
import AddIcon from '../../Assets/Icons/addoperation.svg';
import Subtract from '../../Assets/Icons/subtract.svg';
import Eye from '../../Assets/Icons/eye_Icon.svg';
import CutEye from '../../Assets/Icons/eye_cut_icon.svg';
import Bread from '../../Assets/Icons/bread.svg';
import Cheese from '../../Assets/Icons/cheese.svg';
import Sushi from '../../Assets/Icons/sushi.svg';
import Beer from '../../Assets/Icons/beer.svg';
import ForwardArrow from '../../Assets/Icons/forward-arrow.svg';
import AddButton from '../../Assets/Icons/add-button.svg';
import ProgressIcon from '../../Assets/Icons/progress-icon.svg';
import Filter1 from '../../Assets/Icons/filter1.svg';
import Filter from '../../Assets/Icons/filter.svg';
import CalendarBg from '../../Assets/Icons/calendar_bg.svg';
import ChatroomBg from '../../Assets/Icons/chat_room_bg.svg';
import Date from '../../Assets/Icons/date.svg';
import NotesBg from '../../Assets/Icons/notes_bg.svg';
import Notes from '../../Assets/Icons/notes.svg';
import Shopping from '../../Assets/Icons/shopping.svg';
import ShoppingBg from '../../Assets/Icons/shopping_bg.svg';
import Social from '../../Assets/Icons/social.svg';
import SocialBg from '../../Assets/Icons/social_bg.svg';
import TaskBg from '../../Assets/Icons/task_bg.svg';
import Todo from '../../Assets/Icons/todo.svg';
import Chatroom from '../../Assets/Icons/chat_room.svg';
import Check from '../../Assets/Icons/check.svg';
import Uncheck from '../../Assets/Icons/uncheck.svg';
import Bicep from '../../Assets/Icons/bicep.svg';
import People from '../../Assets/Icons/people.svg';
import Moon from '../../Assets/Icons/moon.svg';
import Keepgood from '../../Assets/Icons/keepgood.svg';
import Motivation from '../../Assets/Icons/motivation.svg';
import Satisfaction from '../../Assets/Icons/satisfaction.svg';
import Disciplane from '../../Assets/Icons/disciplane.svg';
import premiumPlan from '../../Assets/Icons/premiumplan.svg';
import HomeFocus from '../../Assets/Icons/home-focus.svg';
import HomeNormal from '../../Assets/Icons/home-normal.svg';
import EditIcon from '../../Assets/Icons/editicon.svg';
import VehicleFocus from '../../Assets/Icons/vehicle-focus.svg';
import VehicleNormal from '../../Assets/Icons/vehicle-normal.svg';
import NotesFocus from '../../Assets/Icons/notes-focus.svg';
import NotesNormal from '../../Assets/Icons/notes-normal.svg';
import ProfileFocus from '../../Assets/Icons/profile-focus.svg';
import ProfileNormal from '../../Assets/Icons/profile-normal.svg';
import profileFocus from '../../Assets/Icons/profilefocus.svg';
import purchase from '../../Assets/Icons/purchase.svg';
import privacy from '../../Assets/Icons/privacy.svg';
import Repair from '../../Assets/Icons/repair.svg';
// Add more as needed
import darkArrow from '../../Assets/Icons/darkarrow.svg';
import airfilter from '../../Assets/Icons/airfilter.svg';
import edit from '../../Assets/Icons/edit.svg';
import bin from '../../Assets/Icons/bin.svg';
import ModalTick from '../../Assets/Icons/modalTick.svg';
import ModalCross from '../../Assets/Icons/modalCross.svg';
import noVehicleImage from '../../Assets/Icons/noVehicleImage.svg';
import TractorIcon from '../../Assets/Icons/tractorIcon.svg';
import TruckIcon from '../../Assets/Icons/truckIcon.svg';
import CarIcon from '../../Assets/Icons/carIcon.svg';
import coin from '../../Assets/Icons/coin.svg';
import popular from '../../Assets/Icons/popular.svg';
import Scan from '../../Assets/Icons/scan.svg';
import Delete from '../../Assets/Icons/delete.svg';
import Expense from '../../Assets/Icons/expense.svg';
import ExpenseFocus from '../../Assets/Icons/expense-focus.svg';

const iconMap = {
  coin: coin,
  popular: popular,
  bin: bin,
  edit: edit,
  airfilter: airfilter,
  darkarrow: darkArrow,
  premiumplan: premiumPlan,
  profilefocus: profileFocus,
  
  // ✅ CORRECTED - Use imported variables directly
  homeFocus: HomeFocus,
  homeNormal: HomeNormal,
  expense: Expense,
  expenseFocus: ExpenseFocus,
  vehicleNormal: VehicleNormal, // ✅ Spelling corrected
  vehicleFocus: VehicleFocus,   // ✅ Spelling corrected
  notesFocus: NotesFocus,
  notesNormal: NotesNormal,
  profileFocus: ProfileFocus,
  profileNormal: ProfileNormal,
  
  back: BackArrow,
  back2: BackArrow2,
  americanCard: AmericanCard,
  applePay: ApplePay,
  apple: AppleIcon,
  checked: CheckedMark,
  days: DaysIcon,
  facebook: FacebookIcon,
  key: KeyIcon,
  sms: Sms,
  masterCard: MasterCard,
  media: Media,
  monthlyPackage: MonthlyPackageIcon,
  notifications: Notifications,
  paypal: Paypal,
  profile: Profile,
  record: Record,
  sent: Sent,
  email: Email,
  visa: Visa,
  yearlyPackage: YearlyPackage,
  eye: EyeIcon,
  slashEye: SlashEyeIcon,
  tick: TickIcon,
  cross: CrossIcon,
  alert: AlertIcon,
  addPrimary: AddPrimary,
  calendar: Calendar,
  album: Album,
  home: Home,
  plusPrimary: PlusPrimary,
  plusSecondary: PlusSecondary,
  privacy: privacy,
  settings: Settings,
  terms: Terms,
  upload: Upload,
  wallet: Wallet,
  switchA: SwitchA,
  switchB: SwitchB,
  switchC: SwitchC,
  switchD: SwitchD,
  camera: Camera,
  tabsBg: TabsBg,
  tabsHome: TabsHome,
  tabsAdd: TabsAdd,
  subject: Subject,
  callPhone: CallPhone,
  heart: Heart,
  comment: Comment,
  like: Like,
  check: Checked,
  add: Add,
  request: Request,
  search: Search,
  menu: Menu,
  hi: Hi,
  filesGroup: GroupFiles,
  attach: AttachFileIcon,
  file: FilePicker,
  mic: Mic,
  video: VideoIcon,
  colorPicker: ColourPicker,
  star: StarIcon,
  downArow: DownArrow,
  journalBlue: JournalBlue,
  calendarBlue: CalendarBlue,
  homeBlue: HomeBlue,
  mediaBlue: MediaBlue,
  close: Close,
  journalIconI: JournalIconI,
  journalIconII: JournalIconII,
  rightArrow: RightArrow,
  leftArrow: LeftArrow,
  share: Share,
  minus: Minus,
  pause: PauseControl,
  pauseBlue: Pause,
  playBlue: Play,
  insert: Insert,
  italic: Italic,
  bold: Bold,
  bullet: Bullet,
  closed: Closed,
  cameras: Cameras,
  gallery: Gallery,
  journalIconIII: JournalIconIII,
  journalIconIV: JournalIconIV,
  journalIconV: JournalIconV,
  logo: Logo,
  steps: Steps,
  partners: Partners,
  activities: Activities,
  other: Other,
  male: Male,
  female: Female,
  backIcon: BackIcon,
  time: time,
  plusbutton: plusbutton,
  rightbutton: rightbutton,
  purchase: purchase,
  // Habit Tracker Drawer Icons
  calorieCounter: CalorieCounter,
  celebrate: Celebrate,
  playInhale: PlayInhale,
  pauseInhale: PauseInhale,
  setting: Setting,
  addIcon: AddIcon,
  subtract: Subtract,
  eyeIcon: Eye,
  cutEye: CutEye,
  cheese: Cheese,
  bread: Bread,
  sushi: Sushi,
  beer: Beer,
  body: BodyMeasurements,
  breathing: Breathing,
  waterIntake: WaterIntake,
  myPurchases: MyPurchases,
  stepsCounter: StepCounter,
  workout: WorkoutPlan,
  track: TrackChallenges,
  aiIcon: AI,
  premium: PremiumIcon,
  checkIcon: checkmark,
  alert2: Alert2,
  forwardArrow: ForwardArrow,
  addButton: AddButton,
  progressIcon: ProgressIcon,
  filter1: Filter1,
  filter: Filter,
  calendarBg: CalendarBg,
  chatroomBg: ChatroomBg,
  date: Date,
  notesBg: NotesBg,
  notes: Notes,
  shopping: Shopping,
  shoppingBg: ShoppingBg,
  social: Social,
  socialBg: SocialBg,
  taskBg: TaskBg,
  todo: Todo,
  chatroom: Chatroom,
  checks: Check,
  uncheck: Uncheck,
  keepgood: Keepgood,
  moon: Moon,
  people: People,
  bicep: Bicep,
  motivation: Motivation,
  satisfaction: Satisfaction,
  disciplane: Disciplane,
  tick2: Tick2,
  repair: Repair,
  modalTick: ModalTick,
  modalCross: ModalCross,
  noVehicles: noVehicleImage,
  tractorIcon: TractorIcon,
  truckIcon: TruckIcon,
  carIcon: CarIcon,
  scan: Scan,
  editIcon: EditIcon,
  delete: Delete,
};

const MyIcons = ({ name, size = 20, color = '#000', stroke, fill, style }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`⚠️ Unknown icon name: ${name}`);
    return null;
  }

  if (typeof IconComponent !== 'function') {
    console.error(` Invalid icon component for "${name}"`);
    return null;
  }

  return (
    <View style={[style]}>
      <IconComponent
        width={size}
        height={size}
        fill={fill || 'none'}
        stroke={stroke || undefined}
      />
    </View>
  );  
};

export { iconMap };
export default MyIcons;