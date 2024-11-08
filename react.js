'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", available: true },
  { id: 2, title: "1984", author: "George Orwell", available: false },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen", available: true },
]

export default function Component() {
  const [user, setUser] = useState({ role: 'user' }) // 'admin' or 'user'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [issueDate, setIssueDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleIssueBook = (e) => {
    e.preventDefault()
    if (!selectedBook || !issueDate || !returnDate) {
      alert('Please fill in all required fields')
      return
    }
    // Here you would typically send this data to your backend
    alert(`Book "${selectedBook.title}" issued successfully!`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Library Management System</CardTitle>
        <CardDescription>Manage your library efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search Books</TabsTrigger>
            <TabsTrigger value="issue">Issue Book</TabsTrigger>
            {user.role === 'admin' && <TabsTrigger value="maintenance">Maintenance</TabsTrigger>}
          </TabsList>
          <TabsContent value="search">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredBooks.map(book => (
                <Card key={book.id}>
                  <CardHeader>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <RadioGroup onValueChange={() => setSelectedBook(book)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={book.id.toString()} id={`book-${book.id}`} />
                        <Label htmlFor={`book-${book.id}`}>Select</Label>
                      </div>
                    </RadioGroup>
                    <span className={`ml-auto ${book.available ? 'text-green-500' : 'text-red-500'}`}>
                      {book.available ? 'Available' : 'Not Available'}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="issue">
            <form onSubmit={handleIssueBook} className="space-y-4">
              <div>
                <Label htmlFor="book">Book</Label>
                <Input id="book" value={selectedBook ? selectedBook.title : ''} readOnly />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={selectedBook ? selectedBook.author : ''} readOnly />
              </div>
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="returnDate">Return Date</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={issueDate}
                />
              </div>
              <Button type="submit">Issue Book</Button>
            </form>
          </TabsContent>
          {user.role === 'admin' && (
            <TabsContent value="maintenance">
              <p>Maintenance features would be implemented here.</p>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => setUser(prev => ({ role: prev.role === 'admin' ? 'user' : 'admin' }))}>
          Toggle Admin/User
        </Button>
      </CardFooter>
    </Card>
  )
}
