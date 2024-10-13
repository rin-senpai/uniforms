import { createSignal } from 'solid-js';
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "~/components/ui/alert-dialog";

export default function Counter() {
  const [open, setOpen] = createSignal(false); // Signal to control AlertDialog open state

  return (
    <div>
      {/* Test Alert Dialog */}
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Show Alert
      </Button>

      {/* Alert Dialog */}
      <AlertDialog open={open()} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Alert Dialog</AlertDialogTitle>
          <AlertDialogDescription>
            An Alert Dialog enables assistive technologies and browsers to distinguish alert dialogs from
            other dialogs so they have the option of giving alert dialogs special treatment, such as
            playing a system alert sound.
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
