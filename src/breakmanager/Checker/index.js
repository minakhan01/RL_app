import checkActivityRuleBreak from './activityrule.break'
import checkIntervalBreak from './interval.break'
import checkScheduledBreak from './scheduled.break'
import checkPreWindow from './prewindow.break'


export default function checkBreak() {
    checkPreWindow()
    checkActivityRuleBreak()
    checkIntervalBreak()
    checkScheduledBreak()
}