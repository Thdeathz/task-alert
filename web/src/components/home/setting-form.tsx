'use client'

import { useForm } from 'react-hook-form'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export default function SettingForm() {
  const form = useForm()

  return (
    <Form {...form}>
      <form className="w-2/3">
        <div className="space-y-4">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="superman@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone-number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mt-4">
          {/* {isPending ? <Loading /> : 'Login'} */}
          Update notifications
        </Button>
      </form>
    </Form>
  )
}
