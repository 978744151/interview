import { Form, useLoaderData ,  useFetcher,useParams} from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
//   const contact = await getContact(params.contactId);
//   return { contact };
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}
export async function action({ request, params }) {
     let formData = await request.formData();
     console.log(formData.get("favorite"))
    return updateContact(params.contactId, {
         favorite: formData.get("favorite") === "true",
    });
}

export default function Contact() {
    const { contact } = useLoaderData() as any;
    console.log(useLoaderData())
//   const contact:any = {
//     first: "Your",
//     last: "Name",
//     avatar: "https://placekitten.com/g/200/200",
//     twitter: "your_handle",
//     notes: "Some notes",
//     favorite: true,
//   };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <>
            {contact.id }
            <i>No Name</i>
            </>
          )}{" "}
          <Favorite contact={contact } />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }:{contact:any} ) {
  // yes, this is a `let` for later
  const fetcher = useFetcher();
  let favorite = contact.favorite;  
  const params = useParams();
  console.log(fetcher)
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  const handleFavorites = async() =>{
    console.log(params.contactId,favorite)
    updateContact(params.contactId, {
         favorite: !contact.favorite,
    });
    console.log(params.contactId,favorite)
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        onClick={handleFavorites}

      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}