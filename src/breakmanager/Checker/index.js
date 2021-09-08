import checkActivityRuleBreak from './activityrule.break'
import checkIntervalBreak from './interval.break'
import checkScheduledBreak from './scheduled.break'

//Checks if any of the breaks need to be triggered
export default function checkBreak(history) {
  checkActivityRuleBreak()
  // checkIntervalBreak(history)
  // checkScheduledBreak()
}